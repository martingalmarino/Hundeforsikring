// JavaScript for forsikring page

// Global variables for data
let forsikringData = [];
let kommunerData = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize with hardcoded data immediately
    initializeWithHardcodedData();
    
    // Populate the table immediately with hardcoded data
    populateForsikringTable();
    populateKommuneGrid();
    
    // Try to load from JSON files (will work if served from web server)
    loadForsikringData();
    loadKommunerData();
});

// Initialize with hardcoded data
function initializeWithHardcodedData() {
    console.log('Initializing with hardcoded data...');
    forsikringData = [
        {
            "udbyder": "Alka Forsikring",
            "produkt": "Alka Hund Ansvar",
            "pris_mdr": "75 kr./md",
            "tilvalg": ["Sygeforsikring", "Livsforsikring"],
            "kampagne": "Ingen selvrisiko ved første skade",
            "dækning": "Basis hundeansvarsforsikring",
            "link": "https://www.alka.dk/forsikringer/hund",
            "kommuner": ["København", "Roskilde", "Greve", "Hvidovre"]
        },
        {
            "udbyder": "Agria",
            "produkt": "Agria Ansvar",
            "pris_mdr": "79 kr./md",
            "tilvalg": ["Sygeforsikring", "Tanddækning", "Medicindækning"],
            "kampagne": "10% rabat ved online bestilling",
            "dækning": "Lovpligtig hundeansvarsforsikring",
            "link": "https://www.agria.dk/hundeforsikring/",
            "kommuner": ["København", "Aarhus", "Aalborg", "Odense", "Roskilde"]
        },
        {
            "udbyder": "Tryg",
            "produkt": "Tryg Hundeforsikring",
            "pris_mdr": "85 kr./md",
            "tilvalg": ["Udvidet ansvar", "Sygeforsikring"],
            "kampagne": "Første måned gratis",
            "dækning": "Ansvarsforsikring med mulighed for udvidelse",
            "link": "https://www.tryg.dk/forsikring/hund",
            "kommuner": ["Horsens", "Vejle", "Randers", "Aarhus", "Aalborg"]
        },
        {
            "udbyder": "GF Forsikring",
            "produkt": "GF Hundeforsikring",
            "pris_mdr": "89 kr./md",
            "tilvalg": ["Sygeforsikring", "Udvidet ansvar", "Medicindækning"],
            "kampagne": "Rabat ved flere kæledyr",
            "dækning": "Obligatorisk ansvarsforsikring + valgfri udvidelser",
            "link": "https://www.gf.dk/hund",
            "kommuner": ["Aarhus", "Aalborg", "Viborg", "Herning"]
        },
        {
            "udbyder": "Dyrekassen Danmark",
            "produkt": "Dyrekassen Hund Basis",
            "pris_mdr": "95 kr./md",
            "tilvalg": ["Sygeforsikring", "Operationer", "Udvidet tanddækning"],
            "kampagne": "Gratis rådgivning inkluderet",
            "dækning": "Ansvar + mulighed for sygdom og tandskader",
            "link": "https://www.dyrekassen.dk/hund/",
            "kommuner": ["Odense", "Esbjerg", "Aalborg", "Silkeborg"]
        },
        {
            "udbyder": "Topdanmark",
            "produkt": "Topdanmark Hundeforsikring",
            "pris_mdr": "99 kr./md",
            "tilvalg": ["Sygeforsikring", "Livsforsikring", "Tandbehandling"],
            "kampagne": "Samlingsrabat ved husstandsforsikringer",
            "dækning": "Hundansvar med mulighed for sygdom og tandbehandling",
            "link": "https://www.topdanmark.dk/hund",
            "kommuner": ["København", "Odense", "Aarhus", "Aalborg"]
        }
    ];
    
    // Initialize kommuner data
    kommunerData = [
        "Aarhus", "Aalborg", "Odense", "København", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde",
        "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge", "Holstebro", "Taastrup", "Slagelse", "Hillerød",
        "Ballerup", "Rødovre", "Glostrup", "Brøndby", "Hvidovre", "Gentofte", "Lyngby-Taarbæk", "Gladsaxe", "Rudersdal", "Furesø",
        "Allerød", "Fredensborg", "Helsingør", "Hørsholm", "Frederikssund", "Egedal", "Frederiksværk-Hundested", "Greve", "Solrød", "Lejre"
    ];
    
    // Populate the table immediately
    populateForsikringTable();
    populateKommuneGrid();
}

// Load forsikring data (optional - will work if served from web server)
async function loadForsikringData() {
    try {
        console.log('Attempting to load forsikring data from JSON...');
        const response = await fetch('../data/hundeforsikring.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('JSON data loaded successfully, updating table...');
        forsikringData = jsonData;
        populateForsikringTable();
    } catch (error) {
        console.log('Could not load from JSON file, using hardcoded data instead');
        // Hardcoded data is already loaded in initializeWithHardcodedData()
    }
}

// Load kommuner data (optional - will work if served from web server)
async function loadKommunerData() {
    try {
        console.log('Attempting to load kommuner data from JSON...');
        const response = await fetch('../data/kommuner.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Kommuner JSON data loaded successfully, updating grid...');
        kommunerData = jsonData;
        populateKommuneGrid();
    } catch (error) {
        console.log('Could not load kommuner from JSON file, using hardcoded data instead');
        // Hardcoded data is already loaded in initializeWithHardcodedData()
    }
}

// Populate forsikring comparison table
function populateForsikringTable() {
    const tableBody = document.getElementById('forsikringTableBody');
    console.log('populateForsikringTable called');
    console.log('tableBody:', tableBody);
    console.log('forsikringData:', forsikringData);
    
    if (!tableBody) {
        console.error('Table body not found');
        return;
    }
    
    if (!forsikringData || forsikringData.length === 0) {
        console.log('No forsikring data available, showing placeholder');
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-spinner fa-spin"></i> Indlæser data...
                </td>
            </tr>
        `;
        return;
    }

    console.log('Populating table with', forsikringData.length, 'items');

    // Filter data based on current kommune if on kommune page
    let filteredData = forsikringData;
    if (window.currentKommune) {
        filteredData = forsikringData.filter(item => 
            item.kommuner && item.kommuner.includes(window.currentKommune)
        );
        console.log(`Filtered data for ${window.currentKommune}:`, filteredData.length, 'items');
    }

    // Sort by price (cheapest first)
    const sortedData = [...filteredData].sort((a, b) => {
        const priceA = parseInt(a.pris_mdr.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.pris_mdr.replace(/[^\d]/g, ''));
        return priceA - priceB;
    });

    if (sortedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-info-circle"></i> Ingen udbydere tilgængelige i denne kommune
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = sortedData.map(item => `
        <tr>
            <td><strong>${item.udbyder}</strong></td>
            <td>${item.produkt}</td>
            <td><span class="price">${item.pris_mdr}</span></td>
            <td>${item.dækning}</td>
            <td class="tilvalg">${item.tilvalg.join(', ')}</td>
            <td><span class="campaign">${item.kampagne}</span></td>
            <td><a href="${item.link}" class="btn btn-primary btn-sm" target="_blank" rel="nofollow">Se tilbud</a></td>
        </tr>
    `).join('');
    
    console.log('Table populated successfully');
}

// Populate kommune grid for forsikring
function populateKommuneGrid() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid || !kommunerData || kommunerData.length === 0) {
        console.log('No kommune data available');
        return;
    }

    // Show first 24 kommuner initially
    const initialKommuner = kommunerData.slice(0, 24);
    
    kommuneGrid.innerHTML = initialKommuner.map(kommune => {
        const cheapestForsikring = getCheapestForsikring(kommune);
        const priceText = cheapestForsikring ? `Fra ${cheapestForsikring.pris_mdr}` : 'Se priser';
        
        return `
            <div class="kommune-card" onclick="navigateToForsikringKommune('${kommune}')">
                <h4>${kommune}</h4>
                <p>${priceText}</p>
                <small>Hundeforsikring i ${kommune}</small>
            </div>
        `;
    }).join('');

    // Add "Show more" button if there are more kommuner
    if (kommunerData.length > 24) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn btn-secondary';
        showMoreBtn.textContent = 'Vis alle kommuner';
        showMoreBtn.onclick = showAllForsikringKommuner;
        
        const showMoreContainer = document.createElement('div');
        showMoreContainer.style.textAlign = 'center';
        showMoreContainer.style.marginTop = '2rem';
        showMoreContainer.appendChild(showMoreBtn);
        
        kommuneGrid.parentNode.appendChild(showMoreContainer);
    }
}

// Show all kommuner for forsikring
function showAllForsikringKommuner() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid || !kommunerData) return;

    kommuneGrid.innerHTML = kommunerData.map(kommune => {
        const cheapestForsikring = getCheapestForsikring(kommune);
        const priceText = cheapestForsikring ? `Fra ${cheapestForsikring.pris_mdr}` : 'Se priser';
        
        return `
            <div class="kommune-card" onclick="navigateToForsikringKommune('${kommune}')">
                <h4>${kommune}</h4>
                <p>${priceText}</p>
                <small>Hundeforsikring i ${kommune}</small>
            </div>
        `;
    }).join('');

    // Remove the "Show more" button
    const showMoreContainer = kommuneGrid.parentNode.querySelector('div[style*="text-align: center"]');
    if (showMoreContainer) {
        showMoreContainer.remove();
    }
}

// Navigate to forsikring kommune page
function navigateToForsikringKommune(kommune) {
    const kommuneSlug = kommune.toLowerCase()
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'a')
        .replace(/[^a-z0-9]/g, '-');
    
    window.location.href = `/forsikring/${kommuneSlug}/`;
}

// Helper function to get cheapest forsikring for a kommune
function getCheapestForsikring(kommune) {
    if (!forsikringData || forsikringData.length === 0) return null;
    
    const availableForsikring = forsikringData.filter(item => 
        item.kommuner && item.kommuner.includes(kommune)
    );
    
    if (availableForsikring.length === 0) return null;
    
    return availableForsikring.reduce((cheapest, current) => {
        const currentPrice = parseInt(current.pris_mdr.replace(/[^\d]/g, ''));
        const cheapestPrice = parseInt(cheapest.pris_mdr.replace(/[^\d]/g, ''));
        return currentPrice < cheapestPrice ? current : cheapest;
    });
}

// Export functions for global use
window.navigateToForsikringKommune = navigateToForsikringKommune;
window.showAllForsikringKommuner = showAllForsikringKommuner;

