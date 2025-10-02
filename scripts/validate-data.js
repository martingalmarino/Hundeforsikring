#!/usr/bin/env node

/**
 * Data Validation Script
 * Validates insurance data structure and content
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/hundeforsikring.json');

function validateData() {
    console.log('🔍 Validating insurance data...');
    
    try {
        // Check if file exists
        if (!fs.existsSync(DATA_FILE)) {
            console.error('❌ Data file not found:', DATA_FILE);
            return false;
        }
        
        // Read and parse JSON
        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        const data = JSON.parse(rawData);
        
        // Validate structure
        if (!Array.isArray(data)) {
            console.error('❌ Data should be an array');
            return false;
        }
        
        if (data.length === 0) {
            console.error('❌ Data array is empty');
            return false;
        }
        
        // Validate each entry
        const requiredFields = ['udbyder', 'produkt', 'pris_mdr', 'dækning', 'tilvalg', 'kampagne', 'link'];
        const errors = [];
        
        data.forEach((entry, index) => {
            // Check required fields
            requiredFields.forEach(field => {
                if (!entry[field]) {
                    errors.push(`Entry ${index}: Missing required field '${field}'`);
                }
            });
            
            // Validate specific fields
            if (entry.udbyder && typeof entry.udbyder !== 'string') {
                errors.push(`Entry ${index}: 'udbyder' should be a string`);
            }
            
            if (entry.pris_mdr && !entry.pris_mdr.match(/\d+\s*kr\.?\/md|Pris på anmodning/)) {
                errors.push(`Entry ${index}: 'pris_mdr' format invalid: ${entry.pris_mdr}`);
            }
            
            if (entry.tilvalg && !Array.isArray(entry.tilvalg)) {
                errors.push(`Entry ${index}: 'tilvalg' should be an array`);
            }
            
            if (entry.link && !entry.link.startsWith('http')) {
                errors.push(`Entry ${index}: 'link' should be a valid URL`);
            }
        });
        
        // Report results
        if (errors.length > 0) {
            console.error('❌ Validation failed:');
            errors.forEach(error => console.error('  -', error));
            return false;
        }
        
        console.log('✅ Data validation passed!');
        console.log(`📊 Found ${data.length} insurance providers`);
        
        // Show summary
        data.forEach(entry => {
            console.log(`  - ${entry.udbyder}: ${entry.pris_mdr}`);
        });
        
        return true;
        
    } catch (error) {
        console.error('❌ Validation error:', error.message);
        return false;
    }
}

// Run validation
if (require.main === module) {
    const isValid = validateData();
    process.exit(isValid ? 0 : 1);
}

module.exports = { validateData };
