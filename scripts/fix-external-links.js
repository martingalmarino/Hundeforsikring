const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const CONFIG = {
    dataFile: path.join(__dirname, '../data/hundeforsikring.json'),
    backupFile: path.join(__dirname, '../data/hundeforsikring-backup.json'),
    logFile: path.join(__dirname, '../logs/link-checker.log'),
    timeout: 10000, // 10 seconds timeout
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

// Fallback URLs for each provider (home pages)
const FALLBACK_URLS = {
    'Agria': 'https://www.agria.dk/',
    'Tryg': 'https://www.tryg.dk/',
    'Alka Forsikring': 'https://www.alka.dk/',
    'GF Forsikring': 'https://www.gf.dk/',
    'Dyrekassen Danmark': 'https://www.dyrekassen.dk/',
    'Topdanmark': 'https://www.topdanmark.dk/',
    'Codan': 'https://www.codan.dk/',
    'Gjensidige': 'https://www.gjensidige.dk/'
};

// Alternative URLs to try for each provider
const ALTERNATIVE_URLS = {
    'Agria': [
        'https://www.agria.dk/hundeforsikring/',
        'https://www.agria.dk/forsikring/hund/',
        'https://www.agria.dk/hund/',
        'https://www.agria.dk/'
    ],
    'Tryg': [
        'https://www.tryg.dk/forsikring/hund',
        'https://www.tryg.dk/hundeforsikring/',
        'https://www.tryg.dk/hund/',
        'https://www.tryg.dk/'
    ],
    'Alka Forsikring': [
        'https://www.alka.dk/forsikringer/hund',
        'https://www.alka.dk/hundeforsikring/',
        'https://www.alka.dk/hund/',
        'https://www.alka.dk/'
    ],
    'GF Forsikring': [
        'https://www.gf.dk/hund',
        'https://www.gf.dk/hundeforsikring/',
        'https://www.gf.dk/forsikring/hund/',
        'https://www.gf.dk/'
    ],
    'Dyrekassen Danmark': [
        'https://www.dyrekassen.dk/hund/',
        'https://www.dyrekassen.dk/hundeforsikring/',
        'https://www.dyrekassen.dk/'
    ],
    'Topdanmark': [
        'https://www.topdanmark.dk/hund',
        'https://www.topdanmark.dk/hundeforsikring/',
        'https://www.topdanmark.dk/forsikring/hund/',
        'https://www.topdanmark.dk/'
    ],
    'Codan': [
        'https://www.codan.dk/forsikring/hundeforsikring',
        'https://www.codan.dk/hundeforsikring/',
        'https://www.codan.dk/hund/',
        'https://www.codan.dk/'
    ],
    'Gjensidige': [
        'https://www.gjensidige.dk/forsikring/hundeforsikring',
        'https://www.gjensidige.dk/hundeforsikring/',
        'https://www.gjensidige.dk/hund/',
        'https://www.gjensidige.dk/'
    ]
};

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    
    // Ensure logs directory exists
    const logsDir = path.dirname(CONFIG.logFile);
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// Check if URL is accessible
function checkUrl(url) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: 'HEAD', // Only check headers, don't download content
            timeout: CONFIG.timeout,
            headers: {
                'User-Agent': CONFIG.userAgent
            }
        };

        const req = client.request(options, (res) => {
            resolve({
                status: res.statusCode,
                accessible: res.statusCode >= 200 && res.statusCode < 400,
                url: url
            });
        });

        req.on('error', (error) => {
            resolve({
                status: 0,
                accessible: false,
                url: url,
                error: error.message
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                status: 0,
                accessible: false,
                url: url,
                error: 'Timeout'
            });
        });

        req.end();
    });
}

// Find working URL for a provider
async function findWorkingUrl(providerName, currentUrl) {
    log(`🔍 Checking URLs for ${providerName}...`);
    
    // First check current URL
    const currentResult = await checkUrl(currentUrl);
    if (currentResult.accessible) {
        log(`✅ Current URL works: ${currentUrl} (${currentResult.status})`);
        return currentUrl;
    }
    
    log(`❌ Current URL failed: ${currentUrl} (${currentResult.status || currentResult.error})`);
    
    // Try alternative URLs
    const alternatives = ALTERNATIVE_URLS[providerName] || [];
    for (const altUrl of alternatives) {
        if (altUrl === currentUrl) continue; // Skip if same as current
        
        const result = await checkUrl(altUrl);
        if (result.accessible) {
            log(`✅ Found working alternative: ${altUrl} (${result.status})`);
            return altUrl;
        } else {
            log(`❌ Alternative failed: ${altUrl} (${result.status || result.error})`);
        }
    }
    
    // Fall back to home page
    const fallbackUrl = FALLBACK_URLS[providerName];
    if (fallbackUrl) {
        const fallbackResult = await checkUrl(fallbackUrl);
        if (fallbackResult.accessible) {
            log(`✅ Using fallback home page: ${fallbackUrl} (${fallbackResult.status})`);
            return fallbackUrl;
        } else {
            log(`❌ Even fallback failed: ${fallbackUrl} (${fallbackResult.status || fallbackResult.error})`);
        }
    }
    
    // Last resort: return current URL (will be marked as broken)
    log(`⚠️ No working URL found for ${providerName}, keeping original`);
    return currentUrl;
}

// Main function to fix external links
async function fixExternalLinks() {
    log('🔗 Starting external link checker and fixer...');
    
    try {
        // Load current data
        const data = JSON.parse(fs.readFileSync(CONFIG.dataFile, 'utf8'));
        log(`📊 Loaded ${data.length} insurance providers`);
        
        // Create backup
        fs.writeFileSync(CONFIG.backupFile, JSON.stringify(data, null, 2));
        log(`💾 Created backup: ${CONFIG.backupFile}`);
        
        let fixedCount = 0;
        let brokenCount = 0;
        
        // Check and fix each provider's link
        for (let i = 0; i < data.length; i++) {
            const provider = data[i];
            const originalUrl = provider.link;
            
            log(`\n🔍 Checking ${provider.udbyder} (${i + 1}/${data.length})...`);
            
            const workingUrl = await findWorkingUrl(provider.udbyder, originalUrl);
            
            if (workingUrl !== originalUrl) {
                provider.link = workingUrl;
                provider.link_fixed = new Date().toISOString();
                provider.original_link = originalUrl;
                fixedCount++;
                log(`✅ Fixed link for ${provider.udbyder}: ${originalUrl} → ${workingUrl}`);
            } else {
                // Check if original URL is actually broken
                const checkResult = await checkUrl(originalUrl);
                if (!checkResult.accessible) {
                    provider.link_broken = true;
                    provider.link_check_date = new Date().toISOString();
                    provider.link_error = checkResult.error || `HTTP ${checkResult.status}`;
                    brokenCount++;
                    log(`❌ Marked as broken: ${provider.udbyder} - ${originalUrl}`);
                } else {
                    log(`✅ Link is working: ${provider.udbyder} - ${originalUrl}`);
                }
            }
            
            // Add small delay to avoid overwhelming servers
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Save updated data
        fs.writeFileSync(CONFIG.dataFile, JSON.stringify(data, null, 2));
        
        // Summary
        log(`\n📊 LINK CHECK SUMMARY:`);
        log(`✅ Fixed links: ${fixedCount}`);
        log(`❌ Broken links: ${brokenCount}`);
        log(`✅ Working links: ${data.length - brokenCount}`);
        log(`📁 Updated data saved to: ${CONFIG.dataFile}`);
        
        return {
            total: data.length,
            fixed: fixedCount,
            broken: brokenCount,
            working: data.length - brokenCount
        };
        
    } catch (error) {
        log(`❌ Error fixing external links: ${error.message}`);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    fixExternalLinks()
        .then((result) => {
            console.log('\n🎉 Link checking completed!');
            console.log(`📊 Results: ${result.fixed} fixed, ${result.broken} broken, ${result.working} working`);
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Link checking failed:', error.message);
            process.exit(1);
        });
}

module.exports = { fixExternalLinks, checkUrl, findWorkingUrl };
