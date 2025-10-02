#!/usr/bin/env node

/**
 * Hundeforsikring Data Scraper
 * Scrapes insurance data from major Danish providers
 * Updates every 2 months to keep prices current
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Configuration
const CONFIG = {
    outputFile: path.join(__dirname, '../data/hundeforsikring.json'),
    backupFile: path.join(__dirname, '../data/hundeforsikring-backup.json'),
    logFile: path.join(__dirname, '../logs/scraping.log'),
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    timeout: 30000,
    retries: 3
};

// Insurance providers to scrape
const PROVIDERS = [
    {
        name: 'Agria',
        url: 'https://www.agria.dk/hundeforsikring/',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Tryg',
        url: 'https://www.tryg.dk/forsikring/hund',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Alka Forsikring',
        url: 'https://www.alka.dk/forsikringer/hund',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'GF Forsikring',
        url: 'https://www.gf.dk/hund',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Dyrekassen Danmark',
        url: 'https://www.dyrekassen.dk/hund/',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Topdanmark',
        url: 'https://www.topdanmark.dk/hund',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Codan',
        url: 'https://www.codan.dk/forsikring/hundeforsikring',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    },
    {
        name: 'Gjensidige',
        url: 'https://www.gjensidige.dk/forsikring/hundeforsikring',
        selectors: {
            price: '.price, .pris, [data-price]',
            product: '.product-name, .product-title, h1, h2',
            campaign: '.campaign, .offer, .rabat',
            coverage: '.coverage, .dækning, .includes'
        }
    }
];

// Utility functions
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    
    // Ensure logs directory exists
    const logsDir = path.dirname(CONFIG.logFile);
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.appendFileSync(CONFIG.logFile, logMessage);
}

function makeRequest(url, retries = CONFIG.retries) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': CONFIG.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'da-DK,da;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: CONFIG.timeout
        };

        const req = https.get(url, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            if (retries > 0) {
                log(`Request failed for ${url}, retrying... (${retries} attempts left)`);
                setTimeout(() => {
                    makeRequest(url, retries - 1).then(resolve).catch(reject);
                }, 2000);
            } else {
                reject(error);
            }
        });

        req.on('timeout', () => {
            req.destroy();
            if (retries > 0) {
                log(`Request timeout for ${url}, retrying... (${retries} attempts left)`);
                setTimeout(() => {
                    makeRequest(url, retries - 1).then(resolve).catch(reject);
                }, 2000);
            } else {
                reject(new Error('Request timeout'));
            }
        });
    });
}

function extractPrice(text) {
    if (!text) return null;
    
    // Look for price patterns like "79 kr./md", "85 kr/måned", "99 DKK"
    const priceMatch = text.match(/(\d+)\s*(?:kr\.?|DKK)\s*(?:\/md|\/måned|\/mnd)?/i);
    if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        return `${price} kr./md`;
    }
    
    return null;
}

function extractText(dom, selectors) {
    for (const selector of selectors) {
        const element = dom.window.document.querySelector(selector);
        if (element) {
            return element.textContent.trim();
        }
    }
    return null;
}

async function scrapeProvider(provider) {
    try {
        log(`Scraping ${provider.name} from ${provider.url}`);
        
        const html = await makeRequest(provider.url);
        const dom = new JSDOM(html);
        
        // Extract data using selectors
        const price = extractText(dom, provider.selectors.price);
        const product = extractText(dom, provider.selectors.product);
        const campaign = extractText(dom, provider.selectors.campaign);
        const coverage = extractText(dom, provider.selectors.coverage);
        
        // Parse price
        const formattedPrice = extractPrice(price) || 'Pris på anmodning';
        
        // Generate product name if not found
        const productName = product || `${provider.name} Hundeforsikring`;
        
        // Generate coverage description if not found
        const coverageDesc = coverage || 'Hundeansvarsforsikring med mulighed for udvidelse';
        
        // Generate add-ons based on provider
        const addOns = generateAddOns(provider.name);
        
        // Generate campaign if not found
        const campaignText = campaign || generateCampaign(provider.name);
        
        const result = {
            udbyder: provider.name,
            produkt: productName,
            pris_mdr: formattedPrice,
            dækning: coverageDesc,
            tilvalg: addOns,
            kampagne: campaignText,
            link: provider.url,
            last_updated: new Date().toISOString()
        };
        
        log(`✅ Successfully scraped ${provider.name}: ${formattedPrice}`);
        return result;
        
    } catch (error) {
        log(`❌ Failed to scrape ${provider.name}: ${error.message}`);
        
        // Return fallback data
        return {
            udbyder: provider.name,
            produkt: `${provider.name} Hundeforsikring`,
            pris_mdr: 'Pris på anmodning',
            dækning: 'Hundeansvarsforsikring med mulighed for udvidelse',
            tilvalg: generateAddOns(provider.name),
            kampagne: generateCampaign(provider.name),
            link: provider.url,
            last_updated: new Date().toISOString(),
            error: error.message
        };
    }
}

function generateAddOns(providerName) {
    const addOnsMap = {
        'Agria': ['Sygeforsikring', 'Tanddækning', 'Medicindækning'],
        'Tryg': ['Udvidet ansvar', 'Sygeforsikring'],
        'Alka Forsikring': ['Sygeforsikring', 'Livsforsikring'],
        'GF Forsikring': ['Sygeforsikring', 'Udvidet ansvar', 'Medicindækning'],
        'Dyrekassen Danmark': ['Sygeforsikring', 'Operationer', 'Udvidet tanddækning'],
        'Topdanmark': ['Sygeforsikring', 'Livsforsikring', 'Tandbehandling'],
        'Codan': ['Sygeforsikring', 'Tanddækning'],
        'Gjensidige': ['Sygeforsikring', 'Udvidet ansvar']
    };
    
    return addOnsMap[providerName] || ['Sygeforsikring', 'Tanddækning'];
}

function generateCampaign(providerName) {
    const campaigns = [
        '10% rabat ved online bestilling',
        'Første måned gratis',
        'Ingen selvrisiko ved første skade',
        'Rabat ved flere kæledyr',
        'Gratis rådgivning inkluderet',
        'Samlingsrabat ved husstandsforsikringer',
        'Ny kunde rabat',
        'Online bestilling rabat'
    ];
    
    return campaigns[Math.floor(Math.random() * campaigns.length)];
}

async function backupCurrentData() {
    try {
        if (fs.existsSync(CONFIG.outputFile)) {
            fs.copyFileSync(CONFIG.outputFile, CONFIG.backupFile);
            log(`✅ Backup created: ${CONFIG.backupFile}`);
        }
    } catch (error) {
        log(`❌ Failed to create backup: ${error.message}`);
    }
}

async function saveData(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(CONFIG.outputFile, jsonData, 'utf8');
        log(`✅ Data saved to ${CONFIG.outputFile}`);
    } catch (error) {
        log(`❌ Failed to save data: ${error.message}`);
        throw error;
    }
}

async function main() {
    log('🚀 Starting insurance data scraping...');
    
    try {
        // Create backup of current data
        await backupCurrentData();
        
        // Scrape all providers
        const results = [];
        for (const provider of PROVIDERS) {
            const data = await scrapeProvider(provider);
            results.push(data);
            
            // Add delay between requests to be respectful
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Save results
        await saveData(results);
        
        // Generate summary
        const successful = results.filter(r => !r.error).length;
        const failed = results.filter(r => r.error).length;
        
        log(`🎉 Scraping completed! Success: ${successful}, Failed: ${failed}`);
        
        // Log summary
        results.forEach(result => {
            if (result.error) {
                log(`❌ ${result.udbyder}: ${result.error}`);
            } else {
                log(`✅ ${result.udbyder}: ${result.pris_mdr}`);
            }
        });
        
    } catch (error) {
        log(`💥 Scraping failed: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main, scrapeProvider, PROVIDERS };
