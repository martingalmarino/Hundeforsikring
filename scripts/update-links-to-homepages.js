const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    dataFile: path.join(__dirname, '../data/hundeforsikring.json'),
    backupFile: path.join(__dirname, '../data/hundeforsikring-backup.json'),
    logFile: path.join(__dirname, '../logs/link-update.log')
};

// Reliable homepage URLs for each provider
const HOMEPAGE_URLS = {
    'Agria': 'https://www.agria.dk/',
    'Tryg': 'https://www.tryg.dk/',
    'Alka Forsikring': 'https://www.alka.dk/',
    'GF Forsikring': 'https://www.gf.dk/',
    'Dyrekassen Danmark': 'https://www.dyrekassen.dk/',
    'Topdanmark': 'https://www.topdanmark.dk/',
    'Codan': 'https://www.codan.dk/',
    'Gjensidige': 'https://www.gjensidige.dk/'
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

// Update all links to reliable homepage URLs
function updateLinksToHomepages() {
    log('🏠 Starting link update to homepage URLs...');
    
    try {
        // Load current data
        const data = JSON.parse(fs.readFileSync(CONFIG.dataFile, 'utf8'));
        log(`📊 Loaded ${data.length} insurance providers`);
        
        // Create backup
        fs.writeFileSync(CONFIG.backupFile, JSON.stringify(data, null, 2));
        log(`💾 Created backup: ${CONFIG.backupFile}`);
        
        let updatedCount = 0;
        
        // Update each provider's link to homepage
        data.forEach((provider, index) => {
            const providerName = provider.udbyder;
            const currentLink = provider.link;
            const homepageUrl = HOMEPAGE_URLS[providerName];
            
            if (homepageUrl && currentLink !== homepageUrl) {
                log(`🔄 Updating ${providerName}: ${currentLink} → ${homepageUrl}`);
                
                provider.link = homepageUrl;
                provider.link_updated = new Date().toISOString();
                provider.previous_link = currentLink;
                updatedCount++;
            } else if (homepageUrl) {
                log(`✅ ${providerName} already has homepage URL: ${homepageUrl}`);
            } else {
                log(`⚠️ No homepage URL configured for ${providerName}`);
            }
        });
        
        // Save updated data
        fs.writeFileSync(CONFIG.dataFile, JSON.stringify(data, null, 2));
        
        // Summary
        log(`\n📊 LINK UPDATE SUMMARY:`);
        log(`✅ Updated links: ${updatedCount}`);
        log(`✅ Total providers: ${data.length}`);
        log(`📁 Updated data saved to: ${CONFIG.dataFile}`);
        
        return {
            total: data.length,
            updated: updatedCount
        };
        
    } catch (error) {
        log(`❌ Error updating links: ${error.message}`);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    try {
        const result = updateLinksToHomepages();
        console.log('\n🎉 Link update completed!');
        console.log(`📊 Results: ${result.updated} updated, ${result.total} total providers`);
        process.exit(0);
    } catch (error) {
        console.error('\n💥 Link update failed:', error.message);
        process.exit(1);
    }
}

module.exports = { updateLinksToHomepages };
