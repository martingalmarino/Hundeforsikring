// Script to generate kommune-specific pages automatically

const fs = require('fs');
const path = require('path');

// Load data
const kommunerData = JSON.parse(fs.readFileSync('./data/kommuner.json', 'utf8'));
const forsikringData = JSON.parse(fs.readFileSync('./data/hundeforsikring.json', 'utf8'));
const tandrensData = JSON.parse(fs.readFileSync('./data/tandrens.json', 'utf8'));

// Load templates
const forsikringTemplate = fs.readFileSync('./templates/forsikring-kommune.html', 'utf8');
const tandrensTemplate = fs.readFileSync('./templates/tandrens-kommune.html', 'utf8');

// Utility functions
function createSlug(kommune) {
    return kommune.toLowerCase()
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'a')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function getForsikringByKommune(kommune) {
    return forsikringData.filter(item => item.kommuner.includes(kommune));
}

function getTandrensByKommune(kommune) {
    return tandrensData.filter(item => item.kommune === kommune);
}

function getCheapestForsikring(kommune) {
    const forsikringForKommune = getForsikringByKommune(kommune);
    if (forsikringForKommune.length === 0) return null;
    
    return forsikringForKommune.reduce((cheapest, current) => 
        current.pris_mdr < cheapest.pris_mdr ? current : cheapest
    );
}

function getCheapestTandrens(kommune) {
    const tandrensForKommune = getTandrensByKommune(kommune);
    if (tandrensForKommune.length === 0) return null;
    
    return tandrensForKommune.reduce((cheapest, current) => 
        current.pris < cheapest.pris ? current : cheapest
    );
}

function getAverageTandrensPrice(kommune) {
    const tandrensForKommune = getTandrensByKommune(kommune);
    if (tandrensForKommune.length === 0) return null;
    
    const total = tandrensForKommune.reduce((sum, item) => sum + item.pris, 0);
    return Math.round(total / tandrensForKommune.length);
}

function formatPrice(price) {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function formatMonthlyPrice(price) {
    return `${formatPrice(price)}/md`;
}

// Generate forsikring pages
function generateForsikringPages() {
    console.log('Generating forsikring pages...');
    
    kommunerData.forEach(kommune => {
        const slug = createSlug(kommune);
        const kommuneSlug = slug;
        
        // Get kommune-specific data
        const forsikringForKommune = getForsikringByKommune(kommune);
        const cheapestForsikring = getCheapestForsikring(kommune);
        
        const cheapestPrice = cheapestForsikring ? formatMonthlyPrice(cheapestForsikring.pris_mdr) : 'Kontakt direkte';
        
        // Replace placeholders in template
        let pageContent = forsikringTemplate
            .replace(/{KOMMUNE}/g, kommune)
            .replace(/{KOMMUNE_SLUG}/g, kommuneSlug)
            .replace(/{CHEAPEST_PRICE}/g, cheapestPrice);
        
        // Create directory if it doesn't exist
        const dirPath = `./forsikring/${kommuneSlug}`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Write page
        const filePath = `${dirPath}/index.html`;
        fs.writeFileSync(filePath, pageContent);
        
        console.log(`Generated: ${filePath}`);
    });
}

// Generate tandrens pages
function generateTandrensPages() {
    console.log('Generating tandrens pages...');
    
    kommunerData.forEach(kommune => {
        const slug = createSlug(kommune);
        const kommuneSlug = slug;
        
        // Get kommune-specific data
        const tandrensForKommune = getTandrensByKommune(kommune);
        const cheapestTandrens = getCheapestTandrens(kommune);
        const averagePrice = getAverageTandrensPrice(kommune);
        
        const cheapestPrice = cheapestTandrens ? formatPrice(cheapestTandrens.pris) : 'Kontakt direkte';
        const averagePriceText = averagePrice ? formatPrice(averagePrice) : 'Ingen data';
        
        // Get highest price
        const highestTandrens = tandrensForKommune.length > 0 ? 
            tandrensForKommune.reduce((max, item) => item.pris > max.pris ? item : max, tandrensForKommune[0]) : 
            null;
        const highestPrice = highestTandrens ? formatPrice(highestTandrens.pris) : 'Ingen data';
        
        // Replace placeholders in template
        let pageContent = tandrensTemplate
            .replace(/{KOMMUNE}/g, kommune)
            .replace(/{KOMMUNE_SLUG}/g, kommuneSlug)
            .replace(/{CHEAPEST_PRICE}/g, cheapestPrice)
            .replace(/{AVERAGE_PRICE}/g, averagePriceText)
            .replace(/{HIGHEST_PRICE}/g, highestPrice);
        
        // Create directory if it doesn't exist
        const dirPath = `./tandrens/${kommuneSlug}`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Write page
        const filePath = `${dirPath}/index.html`;
        fs.writeFileSync(filePath, pageContent);
        
        console.log(`Generated: ${filePath}`);
    });
}

// Generate sitemap
function generateSitemap() {
    console.log('Generating sitemap...');
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://hundeforsikring.dk/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://hundeforsikring.dk/forsikring/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://hundeforsikring.dk/tandrens/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://hundeforsikring.dk/guide/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://hundeforsikring.dk/faq/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;

    // Add forsikring kommune pages
    kommunerData.forEach(kommune => {
        const slug = createSlug(kommune);
        sitemap += `
    <url>
        <loc>https://hundeforsikring.dk/forsikring/${slug}/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    // Add tandrens kommune pages
    kommunerData.forEach(kommune => {
        const slug = createSlug(kommune);
        sitemap += `
    <url>
        <loc>https://hundeforsikring.dk/tandrens/${slug}/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;

    fs.writeFileSync('./sitemap.xml', sitemap);
    console.log('Generated: sitemap.xml');
}

// Generate robots.txt
function generateRobotsTxt() {
    console.log('Generating robots.txt...');
    
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://hundeforsikring.dk/sitemap.xml

# Disallow admin and private areas
Disallow: /templates/
Disallow: /scripts/
Disallow: /data/
`;

    fs.writeFileSync('./robots.txt', robotsContent);
    console.log('Generated: robots.txt');
}

// Main execution
function main() {
    console.log('Starting page generation...');
    console.log(`Generating pages for ${kommunerData.length} kommuner`);
    
    try {
        generateForsikringPages();
        generateTandrensPages();
        generateSitemap();
        generateRobotsTxt();
        
        console.log('\n✅ Page generation completed successfully!');
        console.log(`Generated ${kommunerData.length * 2} kommune pages`);
        console.log('Generated sitemap.xml and robots.txt');
        
    } catch (error) {
        console.error('❌ Error during page generation:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateForsikringPages,
    generateTandrensPages,
    generateSitemap,
    generateRobotsTxt,
    createSlug,
    getForsikringByKommune,
    getTandrensByKommune
};
