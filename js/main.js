// Main JavaScript functionality for Hundeforsikring.dk

// Global data storage
let kommunerData = ['Aarhus', 'Aalborg', 'Odense', 'København', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde', 'Herning', 'Silkeborg', 'Næstved', 'Fredericia', 'Viborg', 'Køge', 'Holstebro', 'Slagelse', 'Hillerød', 'Ballerup', 'Rødovre', 'Glostrup', 'Brøndby', 'Hvidovre', 'Gentofte', 'Lyngby-Taarbæk', 'Gladsaxe', 'Rudersdal', 'Furesø', 'Allerød', 'Fredensborg', 'Helsingør', 'Hørsholm', 'Frederikssund', 'Egedal', 'Frederiksværk-Hundested', 'Greve', 'Solrød', 'Lejre', 'Holbæk', 'Kalundborg', 'Ringsted', 'Sorø', 'Vordingborg', 'Guldborgsund', 'Lolland', 'Bornholm', 'Haderslev', 'Billund', 'Sønderborg', 'Tønder', 'Fanø', 'Varde', 'Vejen', 'Aabenraa', 'Ikast-Brande', 'Ringkøbing-Skjern', 'Lemvig', 'Struer', 'Syddjurs', 'Norddjurs', 'Favrskov', 'Odder', 'Samsø', 'Assens', 'Faaborg-Midtfyn', 'Kerteminde', 'Nyborg', 'Svendborg', 'Nordfyns', 'Langeland', 'Ærø', 'Brønderslev', 'Frederikshavn', 'Hjørring', 'Jammerbugt', 'Læsø', 'Mariagerfjord', 'Morsø', 'Rebild', 'Thisted', 'Vesthimmerland', 'Skive', 'Høje-Taastrup', 'Ishøj', 'Tårnby', 'Dragør', 'Halsnæs', 'Gribskov', 'Odsherred', 'Faxe', 'Stevns', 'Høje-Taastrup', 'Ishøj', 'Tårnby', 'Dragør', 'Halsnæs', 'Gribskov'];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Hundeforsikring app...');
    loadKommuneData();
    initializeMobileMenu();
});

// Load kommune data
async function loadKommuneData() {
    try {
        console.log('📡 Loading kommune data...');
        const kommunerResponse = await fetch('./data/kommuner.json');
        kommunerData = await kommunerResponse.json();
        
        console.log('✅ Kommune data loaded:', kommunerData.length, 'kommuner');
        
        // Initialize kommune features after data is loaded
        initializeKommuneSearch();
        initializeKommuneGrid();
        
    } catch (error) {
        console.error('❌ Error loading kommune data:', error);
        // Fallback to hardcoded data
        initializeWithHardcodedKommuneData();
    }
}

// Fallback hardcoded kommune data
function initializeWithHardcodedKommuneData() {
    console.log('🔄 Using hardcoded kommune data...');
    kommunerData = [
        'Aarhus', 'Aalborg', 'Odense', 'København', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde', 'Herning', 'Silkeborg', 'Næstved', 'Fredericia', 'Viborg', 'Køge', 'Holstebro', 'Slagelse', 'Hillerød', 'Ballerup', 'Rødovre', 'Glostrup', 'Brøndby', 'Hvidovre', 'Gentofte', 'Lyngby-Taarbæk', 'Gladsaxe', 'Rudersdal', 'Furesø', 'Allerød', 'Fredensborg', 'Helsingør', 'Hørsholm', 'Frederikssund', 'Egedal', 'Frederiksværk-Hundested', 'Greve', 'Solrød', 'Lejre', 'Holbæk', 'Kalundborg', 'Ringsted', 'Sorø', 'Vordingborg', 'Guldborgsund', 'Lolland', 'Bornholm', 'Haderslev', 'Billund', 'Sønderborg', 'Tønder', 'Fanø', 'Varde', 'Vejen', 'Aabenraa', 'Ikast-Brande', 'Ringkøbing-Skjern', 'Lemvig', 'Struer', 'Syddjurs', 'Norddjurs', 'Favrskov', 'Odder', 'Samsø', 'Assens', 'Faaborg-Midtfyn', 'Kerteminde', 'Nyborg', 'Svendborg', 'Nordfyns', 'Langeland', 'Ærø', 'Brønderslev', 'Frederikshavn', 'Hjørring', 'Jammerbugt', 'Læsø', 'Mariagerfjord', 'Morsø', 'Rebild', 'Thisted', 'Vesthimmerland', 'Skive', 'Høje-Taastrup', 'Ishøj', 'Tårnby', 'Dragør', 'Halsnæs', 'Gribskov', 'Odsherred', 'Faxe', 'Stevns'
    ];
    
    console.log('✅ Hardcoded kommune data loaded:', kommunerData.length, 'kommuner');
    
    // Initialize kommune features with hardcoded data
    initializeKommuneSearch();
    initializeKommuneGrid();
}

// Initialize kommune search functionality
function initializeKommuneSearch() {
    console.log('🔍 Initializing kommune search...');
    const searchInput = document.getElementById('kommuneSearch');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) {
        console.log('⚠️ Search elements not found');
        return;
    }

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
    
    console.log('✅ Kommune search initialized');
}

// Select kommune from search
function selectKommune(kommune) {
    console.log('🎯 Kommune selected:', kommune);
    document.getElementById('kommuneSearch').value = kommune;
    document.getElementById('searchResults').style.display = 'none';
    
    // Redirect to kommune page
    navigateToForsikringKommune(kommune);
}

// Initialize kommune grid
function initializeKommuneGrid() {
    console.log('🏘️ Initializing kommune grid...');
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid) {
        console.log('⚠️ Kommune grid not found');
        return;
    }

    // Show first 24 kommuner initially
    const initialKommuner = kommunerData.slice(0, 24);
    
    kommuneGrid.innerHTML = initialKommuner.map(kommune => `
        <div class="kommune-card" onclick="navigateToForsikringKommune('${kommune}')">
            <h4>${kommune}</h4>
            <p>Se priser i ${kommune}</p>
        </div>
    `).join('');

    // Add "Show more" button if there are more kommuner
    if (kommunerData.length > 24) {
        const showMoreContainer = document.createElement('div');
        showMoreContainer.style.textAlign = 'center';
        showMoreContainer.style.marginTop = '2rem';
        
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn btn-secondary';
        showMoreBtn.textContent = `Vis alle ${kommunerData.length} kommuner`;
        showMoreBtn.onclick = showAllKommuner;
        
        showMoreContainer.appendChild(showMoreBtn);
        kommuneGrid.parentNode.appendChild(showMoreContainer);
    }
    
    console.log('✅ Kommune grid initialized with', initialKommuner.length, 'kommuner');
}

// Show all kommuner
function showAllKommuner() {
    console.log('📋 Showing all kommuner...');
    const kommuneGrid = document.getElementById('kommuneGrid');
    if (!kommuneGrid) return;

    kommuneGrid.innerHTML = kommunerData.map(kommune => `
        <div class="kommune-card" onclick="navigateToForsikringKommune('${kommune}')">
            <h4>${kommune}</h4>
            <p>Se priser i ${kommune}</p>
        </div>
    `).join('');

    // Remove the "Show more" button
    const showMoreContainer = kommuneGrid.parentNode.querySelector('div[style*="text-align: center"]');
    if (showMoreContainer) {
        showMoreContainer.remove();
    }
    
    console.log('✅ All kommuner displayed');
}

// Navigate to forsikring kommune page
function navigateToForsikringKommune(kommune) {
    console.log('🔗 Navigating to forsikring page for:', kommune);
    const kommuneSlug = kommune.toLowerCase()
        .replace('ø', 'o')
        .replace('æ', 'ae')
        .replace('å', 'aa')
        .replace(' ', '-');
    
    // Check if we're already on a forsikring page
    if (window.location.pathname.includes('/forsikring/')) {
        window.location.href = `${kommuneSlug}/`;
    } else {
        window.location.href = `./forsikring/${kommuneSlug}/`;
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    console.log('📱 Initializing mobile menu...');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuToggle || !mobileMenu) {
        console.log('⚠️ Mobile menu elements not found');
        return;
    }

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    console.log('✅ Mobile menu initialized');
}

// Utility function to get cheapest price for a kommune
function getCheapestPriceForKommune(kommune) {
    // This would typically fetch from forsikringData
    // For now, return a placeholder
    return '75 kr./md';
}

// Export functions for global access
window.selectKommune = selectKommune;
window.navigateToForsikringKommune = navigateToForsikringKommune;
window.showAllKommuner = showAllKommuner;