#!/usr/bin/env node

/**
 * Version Update Script
 * Updates version parameters in HTML files to force cache refresh
 */

const fs = require('fs');
const path = require('path');

function updateVersionInFile(filePath, version) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update CSS version
        content = content.replace(
            /href="([^"]*\.css)(\?v=\d+)?"/g,
            `href="$1?v=${version}"`
        );
        
        // Update JS version
        content = content.replace(
            /src="([^"]*\.js)(\?v=\d+)?"/g,
            `src="$1?v=${version}"`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated versions in ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Failed to update ${filePath}:`, error.message);
    }
}

function main() {
    const version = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    console.log(`🔄 Updating version to ${version}...`);
    
    // Update main pages
    const files = [
        'index.html',
        'forsikring/index.html',
        'faq/index.html'
    ];
    
    files.forEach(file => {
        const filePath = path.join(__dirname, '..', file);
        if (fs.existsSync(filePath)) {
            updateVersionInFile(filePath, version);
        }
    });
    
    console.log('🎉 Version update completed!');
}

if (require.main === module) {
    main();
}

module.exports = { updateVersionInFile };
