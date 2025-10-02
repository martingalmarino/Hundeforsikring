// JavaScript for forsikring page

// Global variables for data
let forsikringData =         [
                {
                        "udbyder": "Agria",
                        "produkt": "Agria Ansvar",
                        "pris_mdr": "79 kr./md",
                        "dækning": "Lovpligtig hundeansvarsforsikring",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Tanddækning",
                                "Medicindækning"
                        ],
                        "kampagne": "10% rabat ved online bestilling",
                        "link": "https://www.agria.dk/",
                        "last_updated": "2025-10-02T00:51:23.463Z",
                        "source": "mock_data",
                        "link_fixed": "2025-10-02T02:29:14.376Z",
                        "original_link": "https://www.agria.dk/hundeforsikring/",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Tryg",
                        "produkt": "Tryg Hundeforsikring",
                        "pris_mdr": "85 kr./md",
                        "dækning": "Ansvarsforsikring med mulighed for udvidelse",
                        "tilvalg": [
                                "Udvidet ansvar",
                                "Sygeforsikring"
                        ],
                        "kampagne": "Første måned gratis",
                        "link": "https://www.tryg.dk/",
                        "last_updated": "2025-10-02T00:51:25.465Z",
                        "source": "mock_data",
                        "link_updated": "2025-10-02T02:57:37.455Z",
                        "previous_link": "https://www.tryg.dk/forsikring/hund",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Alka Forsikring",
                        "produkt": "Alka Hund Ansvar",
                        "pris_mdr": "75 kr./md",
                        "dækning": "Basis hundeansvarsforsikring",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Livsforsikring"
                        ],
                        "kampagne": "Ingen selvrisiko ved første skade",
                        "link": "https://www.alka.dk/",
                        "last_updated": "2025-10-02T00:51:27.467Z",
                        "source": "mock_data",
                        "link_updated": "2025-10-02T02:56:00.000Z",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "GF Forsikring",
                        "produkt": "GF Hundeforsikring",
                        "pris_mdr": "89 kr./md",
                        "dækning": "Obligatorisk ansvarsforsikring + valgfri udvidelser",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Udvidet ansvar",
                                "Medicindækning"
                        ],
                        "kampagne": "Rabat ved flere kæledyr",
                        "link": "https://www.gf.dk/",
                        "last_updated": "2025-10-02T00:51:29.471Z",
                        "source": "mock_data",
                        "link_fixed": "2025-10-02T02:29:28.257Z",
                        "original_link": "https://www.gf.dk/hund",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Dyrekassen Danmark",
                        "produkt": "Dyrekassen Hund Basis",
                        "pris_mdr": "95 kr./md",
                        "dækning": "Ansvar + mulighed for sygdom og tandskader",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Operationer",
                                "Udvidet tanddækning"
                        ],
                        "kampagne": "Gratis rådgivning inkluderet",
                        "link": "https://www.dyrekassen.dk/",
                        "last_updated": "2025-10-02T00:51:31.473Z",
                        "source": "mock_data",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Topdanmark",
                        "produkt": "Topdanmark Hundeforsikring",
                        "pris_mdr": "99 kr./md",
                        "dækning": "Hundansvar med mulighed for sygdom og tandbehandling",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Livsforsikring",
                                "Tandbehandling"
                        ],
                        "kampagne": "Samlingsrabat ved husstandsforsikringer",
                        "link": "https://www.topdanmark.dk/",
                        "last_updated": "2025-10-02T00:51:33.475Z",
                        "source": "mock_data",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Codan",
                        "produkt": "Codan Hundeforsikring",
                        "pris_mdr": "82 kr./md",
                        "dækning": "Hundeansvarsforsikring med udvidelser",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Tanddækning"
                        ],
                        "kampagne": "Ny kunde rabat",
                        "link": "https://www.codan.dk/",
                        "last_updated": "2025-10-02T00:51:35.477Z",
                        "source": "mock_data",
                        "link_fixed": "2025-10-02T02:29:40.626Z",
                        "original_link": "https://www.codan.dk/forsikring/hundeforsikring",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                },
                {
                        "udbyder": "Gjensidige",
                        "produkt": "Gjensidige Hundeforsikring",
                        "pris_mdr": "88 kr./md",
                        "dækning": "Ansvar med mulighed for sygdom",
                        "tilvalg": [
                                "Sygeforsikring",
                                "Udvidet ansvar"
                        ],
                        "kampagne": "Online bestilling rabat",
                        "link": "https://www.gjensidige.dk/",
                        "last_updated": "2025-10-02T00:51:37.480Z",
                        "source": "mock_data",
                        "link_fixed": "2025-10-02T02:29:47.755Z",
                        "original_link": "https://www.gjensidige.dk/forsikring/hundeforsikring",
                        "kommuner": [
                                "København",
                                "Odense",
                                "Aarhus",
                                "Aalborg"
                        ]
                }
        ];
// Use global kommunerData from main.js, initialize if not exists
if (typeof window.kommunerData === 'undefined') {
    window.kommunerData = ["Aarhus", "Aalborg", "Odense", "København", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde", "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge", "Holstebro", "Slagelse", "Hillerød", "Ballerup", "Rødovre", "Glostrup", "Brøndby", "Hvidovre", "Gentofte", "Lyngby-Taarbæk", "Gladsaxe", "Rudersdal", "Furesø", "Allerød", "Fredensborg", "Helsingør", "Hørsholm", "Frederikssund", "Egedal", "Frederiksværk-Hundested", "Greve", "Solrød", "Lejre", "Holbæk", "Kalundborg", "Ringsted", "Sorø", "Vordingborg", "Guldborgsund", "Lolland", "Bornholm", "Haderslev", "Billund", "Sønderborg", "Tønder", "Fanø", "Varde", "Vejen", "Aabenraa", "Ikast-Brande", "Ringkøbing-Skjern", "Lemvig", "Struer", "Syddjurs", "Norddjurs", "Favrskov", "Odder", "Samsø", "Assens", "Faaborg-Midtfyn", "Kerteminde", "Nyborg", "Svendborg", "Nordfyns", "Langeland", "Ærø", "Brønderslev", "Frederikshavn", "Hjørring", "Jammerbugt", "Læsø", "Mariagerfjord", "Morsø", "Rebild", "Thisted", "Vesthimmerland", "Skive", "Høje-Taastrup", "Ishøj", "Tårnby", "Dragør", "Halsnæs", "Gribskov", "Odsherred", "Faxe", "Stevns"];
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize with hardcoded data immediately
    initializeWithHardcodedData();
    
    // Populate the table immediately with hardcoded data
    setTimeout(() => {
        console.log('Populating table after 100ms delay...');
        populateForsikringTable();
        populateKommuneGrid();
    }, 100);
    
    // Try to load from JSON files (will work if served from web server)
    loadForsikringData();
    loadKommunerData();
});

// Also try to populate on window load as backup
window.addEventListener('load', function() {
    console.log('Window loaded, ensuring table is populated...');
    if (forsikringData && forsikringData.length > 0) {
        populateForsikringTable();
        // Only populate kommune grid if not already populated
        const kommuneGrid = document.getElementById('kommuneGrid');
        if (kommuneGrid && kommuneGrid.dataset.populated !== 'true') {
            populateKommuneGrid();
        }
    } else {
        console.log('No data available, reinitializing...');
        initializeWithHardcodedData();
        populateForsikringTable();
        // Only populate kommune grid if not already populated
        const kommuneGrid = document.getElementById('kommuneGrid');
        if (kommuneGrid && kommuneGrid.dataset.populated !== 'true') {
            populateKommuneGrid();
        }
    }
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
        "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge", "Holstebro", "Slagelse", "Hillerød", "Ballerup",
        "Rødovre", "Glostrup", "Brøndby", "Hvidovre", "Gentofte", "Lyngby-Taarbæk", "Gladsaxe", "Rudersdal", "Furesø", "Allerød",
        "Fredensborg", "Helsingør", "Hørsholm", "Frederikssund", "Egedal", "Frederiksværk-Hundested", "Greve", "Solrød", "Lejre", "Holbæk",
        "Kalundborg", "Ringsted", "Sorø", "Vordingborg", "Guldborgsund", "Lolland", "Bornholm", "Haderslev", "Billund", "Sønderborg",
        "Tønder", "Fanø", "Varde", "Vejen", "Aabenraa", "Ikast-Brande", "Ringkøbing-Skjern", "Lemvig", "Struer", "Syddjurs",
        "Norddjurs", "Favrskov", "Odder", "Samsø", "Assens", "Faaborg-Midtfyn", "Kerteminde", "Nyborg", "Svendborg", "Nordfyns",
        "Langeland", "Ærø", "Brønderslev", "Frederikshavn", "Hjørring", "Jammerbugt", "Læsø", "Mariagerfjord", "Morsø", "Rebild",
        "Thisted", "Vesthimmerland", "Skive", "Høje-Taastrup", "Ishøj", "Tårnby", "Dragør", "Halsnæs", "Gribskov", "Odsherred",
        "Faxe", "Stevns"
    ];
    
    // Populate the table immediately
    populateForsikringTable();
    populateKommuneGrid();
}

// Load forsikring data (optional - will work if served from web server)
async function loadForsikringData() {
    try {
        console.log('Attempting to load forsikring data from JSON...');
        const response = await fetch('/data/hundeforsikring.json');
        
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
        const response = await fetch('/data/kommuner.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Kommuner JSON data loaded successfully, updating grid...');
        window.kommunerData = jsonData;
        // Only populate if not already populated
        const kommuneGrid = document.getElementById('kommuneGrid');
        if (kommuneGrid && kommuneGrid.dataset.populated !== 'true') {
            populateKommuneGrid();
        }
    } catch (error) {
        console.log('Could not load kommuner from JSON file, using hardcoded data instead');
        // Hardcoded data is already loaded in initializeWithHardcodedData()
    }
}

// Populate forsikring comparison table
function populateForsikringTable() {
    console.log('=== populateForsikringTable called ===');
    const tableBody = document.getElementById('forsikringTableBody');
    console.log('tableBody element:', tableBody);
    console.log('forsikringData length:', forsikringData ? forsikringData.length : 'undefined');
    console.log('forsikringData:', forsikringData);
    
    if (!tableBody) {
        console.error('❌ Table body not found - element with id "forsikringTableBody" does not exist');
        console.log('Available elements:', document.querySelectorAll('[id*="table"]'));
        return;
    }
    
    if (!forsikringData || forsikringData.length === 0) {
        console.log('⚠️ No forsikring data available, showing placeholder');
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

    const tableHTML = sortedData.map((item, index) => {
        const price = parseInt(item.pris_mdr.replace(/[^\d]/g, ''));
        let buttonClass = 'btn btn-primary btn-sm';
        
        // Assign special classes based on price tier
        if (index === 0) {
            // Cheapest - best price
            buttonClass += ' best-price';
        } else if (index === sortedData.length - 1) {
            // Most expensive - premium
            buttonClass += ' premium';
        } else {
            // Standard pricing
            buttonClass += ' standard';
        }
        
        return `
        <tr>
            <td><strong>${item.udbyder}</strong></td>
            <td>${item.produkt}</td>
                <td><span class="price">${item.pris_mdr}</span></td>
            <td>${item.dækning}</td>
                <td class="tilvalg">${item.tilvalg.join(', ')}</td>
            <td><span class="campaign">${item.kampagne}</span></td>
                <td><a href="${item.link}" class="${buttonClass}" target="_blank" rel="nofollow"><i class="fas fa-external-link-alt"></i> Se tilbud</a></td>
        </tr>
        `;
    }).join('');
    
    console.log('Generated table HTML:', tableHTML);
    console.log('Setting innerHTML on tableBody...');
    tableBody.innerHTML = tableHTML;
    console.log('✅ Table populated successfully with', sortedData.length, 'rows');
    console.log('Table body after population:', tableBody.innerHTML);
    
    // Also populate mobile cards
    populateMobileCards(sortedData);
}

// Populate mobile cards layout
function populateMobileCards(data) {
    console.log('📱 Populating mobile cards...');
    const mobileCardsContainer = document.getElementById('mobileCards');
    
    if (!mobileCardsContainer) {
        console.log('Mobile cards container not found');
        return;
    }
    
    const cardsHTML = data.map(item => `
        <div class="insurance-card">
            <div class="card-header">
                <div>
                    <h3 class="card-provider">${item.udbyder}</h3>
                    <p class="card-product">${item.produkt}</p>
                </div>
                <div class="card-price">${item.pris_mdr}</div>
            </div>
            
            <div class="card-coverage">
                <h4>Dækning</h4>
                <p>${item.dækning}</p>
            </div>
            
            <div class="card-addons">
                <h4>Tilvalg</h4>
                <div class="addon-tags">
                    ${item.tilvalg.map(addon => `<span class="addon-tag">${addon}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-campaign">
                <span class="campaign-badge">${item.kampagne}</span>
            </div>
            
            <div class="card-action">
                <a href="${item.link}" class="btn btn-primary" target="_blank" rel="nofollow">
                    <i class="fas fa-external-link-alt"></i> Se tilbud
                </a>
            </div>
        </div>
    `).join('');
    
    mobileCardsContainer.innerHTML = cardsHTML;
    console.log('✅ Mobile cards populated successfully with', data.length, 'cards');
}

// Populate kommune grid for forsikring
function populateKommuneGrid() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid || !window.kommunerData || window.kommunerData.length === 0) {
        console.log('No kommune data available');
        return;
    }

    // Prevent multiple executions
    if (kommuneGrid.dataset.populated === 'true') {
        console.log('Kommune grid already populated, skipping...');
        return;
    }

    console.log('Populating kommune grid with', window.kommunerData.length, 'kommuner');

    // Remove any existing show more buttons first
    const existingButtons = kommuneGrid.parentNode.querySelectorAll('.show-more-button-container');
    existingButtons.forEach(btn => btn.remove());

    // Show first 24 kommuner initially
    const initialKommuner = window.kommunerData.slice(0, 24);
    
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
    if (window.kommunerData.length > 24) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn btn-secondary';
        showMoreBtn.textContent = 'Vis alle 98 kommuner';
        showMoreBtn.onclick = showAllForsikringKommuner;
        
        const showMoreContainer = document.createElement('div');
        showMoreContainer.className = 'show-more-button-container';
        showMoreContainer.style.textAlign = 'center';
        showMoreContainer.style.marginTop = '2rem';
        showMoreContainer.appendChild(showMoreBtn);
        
        kommuneGrid.parentNode.appendChild(showMoreContainer);
    }

    // Mark as populated
    kommuneGrid.dataset.populated = 'true';
}

// Show all kommuner for forsikring
function showAllForsikringKommuner() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid || !window.kommunerData) return;

    // Remove all existing show more buttons
    const existingButtons = kommuneGrid.parentNode.querySelectorAll('.show-more-button-container');
    existingButtons.forEach(btn => btn.remove());

    kommuneGrid.innerHTML = window.kommunerData.map(kommune => {
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

    // Reset populated state
    kommuneGrid.dataset.populated = 'false';
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

