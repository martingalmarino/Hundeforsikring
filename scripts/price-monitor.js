#!/usr/bin/env node

/**
 * Price Monitoring Script
 * Tracks price changes and generates alerts
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/hundeforsikring.json');
const HISTORY_FILE = path.join(__dirname, '../data/price-history.json');

function extractPrice(priceString) {
    if (!priceString || priceString === 'Pris på anmodning') {
        return null;
    }
    
    const match = priceString.match(/(\d+)\s*kr\.?\/md/);
    return match ? parseInt(match[1]) : null;
}

function loadPriceHistory() {
    try {
        if (fs.existsSync(HISTORY_FILE)) {
            return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
        }
    } catch (error) {
        console.log('No price history found, starting fresh');
    }
    return {};
}

function savePriceHistory(history) {
    try {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    } catch (error) {
        console.error('Failed to save price history:', error.message);
    }
}

function analyzePriceChanges() {
    console.log('📊 Analyzing price changes...');
    
    try {
        // Load current data
        const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const history = loadPriceHistory();
        
        const changes = [];
        const timestamp = new Date().toISOString();
        
        currentData.forEach(entry => {
            const currentPrice = extractPrice(entry.pris_mdr);
            const provider = entry.udbyder;
            
            if (!currentPrice) return; // Skip entries without valid prices
            
            const lastPrice = history[provider]?.price;
            const lastUpdate = history[provider]?.timestamp;
            
            if (lastPrice && lastPrice !== currentPrice) {
                const change = currentPrice - lastPrice;
                const changePercent = ((change / lastPrice) * 100).toFixed(1);
                
                changes.push({
                    provider,
                    oldPrice: lastPrice,
                    newPrice: currentPrice,
                    change,
                    changePercent,
                    direction: change > 0 ? 'increase' : 'decrease'
                });
                
                console.log(`📈 ${provider}: ${lastPrice} → ${currentPrice} kr./md (${changePercent}%)`);
            }
            
            // Update history
            history[provider] = {
                price: currentPrice,
                timestamp,
                product: entry.produkt
            };
        });
        
        // Save updated history
        savePriceHistory(history);
        
        // Generate summary
        if (changes.length > 0) {
            console.log(`\n🎯 Price changes detected: ${changes.length}`);
            
            const increases = changes.filter(c => c.direction === 'increase');
            const decreases = changes.filter(c => c.direction === 'decrease');
            
            if (increases.length > 0) {
                console.log(`📈 Price increases: ${increases.length}`);
                increases.forEach(change => {
                    console.log(`  - ${change.provider}: +${change.change} kr./md (+${change.changePercent}%)`);
                });
            }
            
            if (decreases.length > 0) {
                console.log(`📉 Price decreases: ${decreases.length}`);
                decreases.forEach(change => {
                    console.log(`  - ${change.provider}: ${change.change} kr./md (${change.changePercent}%)`);
                });
            }
            
            // Find cheapest provider
            const validPrices = currentData
                .map(entry => ({
                    provider: entry.udbyder,
                    price: extractPrice(entry.pris_mdr)
                }))
                .filter(entry => entry.price !== null)
                .sort((a, b) => a.price - b.price);
            
            if (validPrices.length > 0) {
                console.log(`\n💰 Cheapest provider: ${validPrices[0].provider} (${validPrices[0].price} kr./md)`);
            }
            
        } else {
            console.log('✅ No price changes detected');
        }
        
        return changes;
        
    } catch (error) {
        console.error('❌ Price analysis failed:', error.message);
        return [];
    }
}

// Run analysis
if (require.main === module) {
    analyzePriceChanges();
}

module.exports = { analyzePriceChanges, extractPrice };
