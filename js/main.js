// Main JavaScript functionality for Hundeforsikring.dk

// Global data storage
let forsikringData = [];
let tandrensData = [];
let kommunerData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeKommuneSearch();
    initializeKommuneGrid();
    initializeMobileMenu();
});

// Load JSON data
async function loadData() {
    try {
        const [forsikringResponse, tandrensResponse, kommunerResponse] = await Promise.all([
            fetch('/data/hundeforsikring.json'),
            fetch('/data/tandrens.json'),
            fetch('/data/kommuner.json')
        ]);

        forsikringData = await forsikringResponse.json();
        tandrensData = await tandrensResponse.json();
        kommunerData = await kommunerResponse.json();

        console.log('Data loaded successfully:', {
            forsikring: forsikringData.length,
            tandrens: tandrensData.length,
            kommuner: kommunerData.length
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize kommune search functionality
function initializeKommuneSearch() {
    const searchInput = document.getElementById('kommuneSearch');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = kommunerData.filter(kommune => 
            kommune.toLowerCase().includes(query)
        ).slice(0, 10);

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(kommune => 
                `<div class="search-result-item" onclick="selectKommune('${kommune}')">${kommune}</div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Select kommune from search
function selectKommune(kommune) {
    document.getElementById('kommuneSearch').value = kommune;
    document.getElementById('searchResults').style.display = 'none';
    
    // Redirect to kommune page
    window.location.href = `/forsikring/${kommune.toLowerCase()}/`;
}

// Initialize kommune grid
function initializeKommuneGrid() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid) return;

    // Show first 24 kommuner initially
    const initialKommuner = kommunerData.slice(0, 24);
    
    kommuneGrid.innerHTML = initialKommuner.map(kommune => `
        <div class="kommune-card" onclick="navigateToKommune('${kommune}')">
            <h4>${kommune}</h4>
            <p>Se priser i ${kommune}</p>
        </div>
    `).join('');

    // Add "Show more" button if there are more kommuner
    if (kommunerData.length > 24) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn btn-secondary';
        showMoreBtn.textContent = 'Vis alle kommuner';
        showMoreBtn.onclick = showAllKommuner;
        
        const showMoreContainer = document.createElement('div');
        showMoreContainer.style.textAlign = 'center';
        showMoreContainer.style.marginTop = '2rem';
        showMoreContainer.appendChild(showMoreBtn);
        
        kommuneGrid.parentNode.appendChild(showMoreContainer);
    }
}

// Show all kommuner
function showAllKommuner() {
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid) return;

    kommuneGrid.innerHTML = kommunerData.map(kommune => `
        <div class="kommune-card" onclick="navigateToKommune('${kommune}')">
            <h4>${kommune}</h4>
            <p>Se priser i ${kommune}</p>
        </div>
    `).join('');

    // Remove the "Show more" button
    const showMoreContainer = kommuneGrid.parentNode.querySelector('div[style*="text-align: center"]');
    if (showMoreContainer) {
        showMoreContainer.remove();
    }
}

// Navigate to kommune page
function navigateToKommune(kommune) {
    const kommuneSlug = kommune.toLowerCase()
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'a')
        .replace(/[^a-z0-9]/g, '-');
    
    window.location.href = `/forsikring/${kommuneSlug}/`;
}

// Initialize mobile menu
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Utility function to format prices
function formatPrice(price) {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Utility function to format monthly price
function formatMonthlyPrice(price) {
    return `${formatPrice(price)}/md`;
}

// Filter forsikring data by kommune
function getForsikringByKommune(kommune) {
    return forsikringData.filter(item => 
        item.kommuner.includes(kommune)
    );
}

// Filter tandrens data by kommune
function getTandrensByKommune(kommune) {
    return tandrensData.filter(item => 
        item.kommune === kommune
    );
}

// Get cheapest forsikring for kommune
function getCheapestForsikring(kommune) {
    const forsikringForKommune = getForsikringByKommune(kommune);
    if (forsikringForKommune.length === 0) return null;
    
    return forsikringForKommune.reduce((cheapest, current) => 
        current.pris_mdr < cheapest.pris_mdr ? current : cheapest
    );
}

// Get cheapest tandrens for kommune
function getCheapestTandrens(kommune) {
    const tandrensForKommune = getTandrensByKommune(kommune);
    if (tandrensForKommune.length === 0) return null;
    
    return tandrensForKommune.reduce((cheapest, current) => 
        current.pris < cheapest.pris ? current : cheapest
    );
}

// Get average price for tandrens in kommune
function getAverageTandrensPrice(kommune) {
    const tandrensForKommune = getTandrensByKommune(kommune);
    if (tandrensForKommune.length === 0) return null;
    
    const total = tandrensForKommune.reduce((sum, item) => sum + item.pris, 0);
    return Math.round(total / tandrensForKommune.length);
}

// Generate comparison table HTML for forsikring
function generateForsikringTable(forsikringData) {
    if (!forsikringData || forsikringData.length === 0) {
        return '<p>Ingen forsikringsselskaber fundet for denne kommune.</p>';
    }

    return `
        <div class="table-container">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Udbyder</th>
                        <th>Produkt</th>
                        <th>Pris/måned</th>
                        <th>Dækning</th>
                        <th>Tilvalg</th>
                        <th>Kampagne</th>
                        <th>Handling</th>
                    </tr>
                </thead>
                <tbody>
                    ${forsikringData.map(item => `
                        <tr>
                            <td><strong>${item.udbyder}</strong></td>
                            <td>${item.produkt}</td>
                            <td><span class="price">${formatMonthlyPrice(item.pris_mdr)}</span></td>
                            <td>${item.dækning}</td>
                            <td>${item.tilvalg.join(', ')}</td>
                            <td><span class="campaign">${item.kampagne}</span></td>
                            <td><a href="${item.link}" class="btn btn-primary btn-sm" target="_blank" rel="nofollow">Se tilbud</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Generate comparison table HTML for tandrens
function generateTandrensTable(tandrensData) {
    if (!tandrensData || tandrensData.length === 0) {
        return '<p>Ingen dyrelægeklinikker fundet for denne kommune.</p>';
    }

    return `
        <div class="table-container">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Klinik</th>
                        <th>Pris</th>
                        <th>Adresse</th>
                        <th>Telefon</th>
                        <th>Rating</th>
                        <th>Handling</th>
                    </tr>
                </thead>
                <tbody>
                    ${tandrensData.map(item => `
                        <tr>
                            <td><strong>${item.klinik}</strong></td>
                            <td><span class="price">${formatPrice(item.pris)}</span></td>
                            <td>${item.adresse}</td>
                            <td><a href="tel:${item.telefon}">${item.telefon}</a></td>
                            <td><span class="rating">${item.rating}/5</span></td>
                            <td><a href="${item.website}" class="btn btn-primary btn-sm" target="_blank" rel="nofollow">Besøg klinik</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Generate FAQ JSON-LD
function generateFAQJSONLD(kommune, questions) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    };
}

// Export functions for use in other pages
window.HundeforsikringUtils = {
    formatPrice,
    formatMonthlyPrice,
    getForsikringByKommune,
    getTandrensByKommune,
    getCheapestForsikring,
    getCheapestTandrens,
    getAverageTandrensPrice,
    generateForsikringTable,
    generateTandrensTable,
    generateFAQJSONLD,
    navigateToKommune,
    selectKommune
};

