// JavaScript for kommune-specific forsikring pages

// Global variables for data
let forsikringData = [];
let currentKommune = '';

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏘️ Kommune page loaded, initializing...');
    
    // Get current kommune from window object (set by page)
    currentKommune = window.currentKommune || '';
    console.log('📍 Current kommune:', currentKommune);
    
    // Initialize with hardcoded data immediately
    initializeWithHardcodedData();
    
    // Populate the table immediately
    setTimeout(() => {
        console.log('📊 Populating kommune table...');
        populateKommuneForsikringTable();
    }, 100);
    
    // Try to load from JSON files
    loadForsikringData();
});

// Also try to populate on window load as backup
window.addEventListener('load', function() {
    console.log('🔄 Window loaded, ensuring kommune table is populated...');
    if (forsikringData && forsikringData.length > 0) {
        populateKommuneForsikringTable();
    } else {
        console.log('🔄 No data available, reinitializing...');
        initializeWithHardcodedData();
        populateKommuneForsikringTable();
    }
});

// Initialize with hardcoded data
function initializeWithHardcodedData() {
    console.log('💾 Initializing with hardcoded data...');
    
    forsikringData = [
        {
            udbyder: 'Agria',
            produkt: 'Agria Ansvar',
            pris_mdr: '79 kr./md',
            tilvalg: ['Sygeforsikring', 'Tanddækning', 'Medicindækning'],
            kampagne: '10% rabat ved online bestilling',
            dækning: 'Lovpligtig hundeansvarsforsikring',
            link: 'https://www.agria.dk/hundeforsikring/'
        },
        {
            udbyder: 'Tryg',
            produkt: 'Tryg Hundeforsikring',
            pris_mdr: '85 kr./md',
            dækning: 'Ansvarsforsikring med mulighed for udvidelse',
            tilvalg: ['Udvidet ansvar', 'Sygeforsikring'],
            kampagne: 'Første måned gratis',
            link: 'https://www.tryg.dk/forsikring/hund'
        },
        {
            udbyder: 'Dyrekassen Danmark',
            produkt: 'Dyrekassen Hund Basis',
            pris_mdr: '95 kr./md',
            dækning: 'Ansvar + mulighed for sygdom og tandskader',
            tilvalg: ['Sygeforsikring', 'Operationer', 'Udvidet tanddækning'],
            kampagne: 'Gratis rådgivning inkluderet',
            link: 'https://www.dyrekassen.dk/hund/'
        },
        {
            udbyder: 'Alka Forsikring',
            produkt: 'Alka Hund Ansvar',
            pris_mdr: '75 kr./md',
            dækning: 'Basis hundeansvarsforsikring',
            tilvalg: ['Sygeforsikring', 'Livsforsikring'],
            kampagne: 'Ingen selvrisiko ved første skade',
            link: 'https://www.alka.dk/forsikringer/hund'
        },
        {
            udbyder: 'GF Forsikring',
            produkt: 'GF Hundeforsikring',
            pris_mdr: '89 kr./md',
            dækning: 'Obligatorisk ansvarsforsikring + valgfri udvidelser',
            tilvalg: ['Sygeforsikring', 'Udvidet ansvar', 'Medicindækning'],
            kampagne: 'Rabat ved flere kæledyr',
            link: 'https://www.gf.dk/hund'
        },
        {
            udbyder: 'Topdanmark',
            produkt: 'Topdanmark Hundeforsikring',
            pris_mdr: '99 kr./md',
            dækning: 'Hundansvar med mulighed for sygdom og tandbehandling',
            tilvalg: ['Sygeforsikring', 'Livsforsikring', 'Tandbehandling'],
            kampagne: 'Samlingsrabat ved husstandsforsikringer',
            link: 'https://www.topdanmark.dk/hund'
        },
        {
            udbyder: 'Codan',
            produkt: 'Codan Hundeforsikring',
            pris_mdr: '82 kr./md',
            dækning: 'Hundeansvarsforsikring med udvidelser',
            tilvalg: ['Sygeforsikring', 'Tanddækning'],
            kampagne: 'Ny kunde rabat',
            link: 'https://www.codan.dk/forsikring/hundeforsikring'
        },
        {
            udbyder: 'Gjensidige',
            produkt: 'Gjensidige Hundeforsikring',
            pris_mdr: '88 kr./md',
            dækning: 'Ansvar med mulighed for sygdom',
            tilvalg: ['Sygeforsikring', 'Udvidet ansvar'],
            kampagne: 'Online bestilling rabat',
            link: 'https://www.gjensidige.dk/forsikring/hundeforsikring'
        }
    ];
    
    console.log('✅ Hardcoded data initialized:', forsikringData.length, 'providers');
}

// Load forsikring data from JSON
async function loadForsikringData() {
    try {
        console.log('📡 Loading forsikring data from JSON...');
        const response = await fetch('./data/hundeforsikring.json');
        if (response.ok) {
            const data = await response.json();
            forsikringData = data;
            console.log('✅ Forsikring data loaded from JSON:', forsikringData.length, 'providers');
            
            // Repopulate table with fresh data
            populateKommuneForsikringTable();
        } else {
            console.log('⚠️ JSON file not found, using hardcoded data');
        }
    } catch (error) {
        console.log('⚠️ Error loading JSON data:', error.message, '- using hardcoded data');
    }
}

// Populate kommune-specific forsikring table
function populateKommuneForsikringTable() {
    console.log('📊 Populating kommune forsikring table for:', currentKommune);
    
    const tableBody = document.getElementById('forsikringTableBody');
    if (!tableBody) {
        console.log('❌ Table body not found');
        return;
    }
    
    if (!forsikringData || forsikringData.length === 0) {
        console.log('❌ No forsikring data available');
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #666;">Ingen data tilgængelig</td></tr>';
        return;
    }
    
    // Sort data by price (cheapest first)
    const sortedData = [...forsikringData].sort((a, b) => {
        const priceA = parseInt(a.pris_mdr.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.pris_mdr.replace(/[^\d]/g, ''));
        return priceA - priceB;
    });
    
    console.log('📈 Sorted data by price:', sortedData.map(item => `${item.udbyder}: ${item.pris_mdr}`));
    
    const html = sortedData.map((item, index) => {
        // Assign button classes based on price tier
        let buttonClass = 'btn btn-primary btn-sm standard';
        
        if (index === 0) {
            buttonClass = 'btn btn-primary btn-sm best-price';
        } else if (index === 1) {
            buttonClass = 'btn btn-primary btn-sm premium';
        }
        
        return `
            <tr>
                <td><strong>${item.udbyder}</strong></td>
                <td>${item.produkt}</td>
                <td><span class="price">${item.pris_mdr}</span></td>
                <td>${item.dækning}</td>
                <td>${item.tilvalg.join(', ')}</td>
                <td><span class="campaign">${item.kampagne}</span></td>
                <td><a href="${item.link}" class="${buttonClass}" target="_blank" rel="nofollow"><i class="fas fa-external-link-alt"></i> Se tilbud</a></td>
            </tr>
        `;
    }).join('');
    
    tableBody.innerHTML = html;
    console.log('✅ Kommune table populated successfully with', sortedData.length, 'rows');
    
    // Update page title with kommune info
    updatePageTitle();
}

// Update page title with kommune-specific info
function updatePageTitle() {
    if (!currentKommune) return;
    
    const cheapest = forsikringData.reduce((min, item) => {
        const price = parseInt(item.pris_mdr.replace(/[^\d]/g, ''));
        const minPrice = parseInt(min.pris_mdr.replace(/[^\d]/g, ''));
        return price < minPrice ? item : min;
    }, forsikringData[0]);
    
    console.log('🏆 Cheapest provider in', currentKommune + ':', cheapest.udbyder, cheapest.pris_mdr);
    
    // Update any dynamic content if needed
    const cheapestElement = document.querySelector('.cheapest-price');
    if (cheapestElement) {
        cheapestElement.textContent = cheapest.pris_mdr;
    }
}

// Export functions for global access
window.populateKommuneForsikringTable = populateKommuneForsikringTable;