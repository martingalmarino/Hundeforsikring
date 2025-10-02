// Emergency table fix - Simple and direct approach
(function() {
    'use strict';
    
    console.log('🚀 Emergency table fix script loaded');
    
    // Data hardcoded directly here
    const forsikringData = [
        {
            "udbyder": "Alka Forsikring",
            "produkt": "Alka Hund Ansvar",
            "pris_mdr": "75 kr./md",
            "tilvalg": ["Sygeforsikring", "Livsforsikring"],
            "kampagne": "Ingen selvrisiko ved første skade",
            "dækning": "Basis hundeansvarsforsikring",
            "link": "https://www.alka.dk/forsikringer/hund"
        },
        {
            "udbyder": "Agria",
            "produkt": "Agria Ansvar",
            "pris_mdr": "79 kr./md",
            "tilvalg": ["Sygeforsikring", "Tanddækning", "Medicindækning"],
            "kampagne": "10% rabat ved online bestilling",
            "dækning": "Lovpligtig hundeansvarsforsikring",
            "link": "https://www.agria.dk/hundeforsikring/"
        },
        {
            "udbyder": "Tryg",
            "produkt": "Tryg Hundeforsikring",
            "pris_mdr": "85 kr./md",
            "tilvalg": ["Udvidet ansvar", "Sygeforsikring"],
            "kampagne": "Første måned gratis",
            "dækning": "Ansvarsforsikring med mulighed for udvidelse",
            "link": "https://www.tryg.dk/forsikring/hund"
        },
        {
            "udbyder": "GF Forsikring",
            "produkt": "GF Hundeforsikring",
            "pris_mdr": "89 kr./md",
            "tilvalg": ["Sygeforsikring", "Udvidet ansvar", "Medicindækning"],
            "kampagne": "Rabat ved flere kæledyr",
            "dækning": "Obligatorisk ansvarsforsikring + valgfri udvidelser",
            "link": "https://www.gf.dk/hund"
        },
        {
            "udbyder": "Dyrekassen Danmark",
            "produkt": "Dyrekassen Hund Basis",
            "pris_mdr": "95 kr./md",
            "tilvalg": ["Sygeforsikring", "Operationer", "Udvidet tanddækning"],
            "kampagne": "Gratis rådgivning inkluderet",
            "dækning": "Ansvar + mulighed for sygdom og tandskader",
            "link": "https://www.dyrekassen.dk/hund/"
        },
        {
            "udbyder": "Topdanmark",
            "produkt": "Topdanmark Hundeforsikring",
            "pris_mdr": "99 kr./md",
            "tilvalg": ["Sygeforsikring", "Livsforsikring", "Tandbehandling"],
            "kampagne": "Samlingsrabat ved husstandsforsikringer",
            "dækning": "Hundansvar med mulighed for sygdom og tandbehandling",
            "link": "https://www.topdanmark.dk/hund"
        }
    ];
    
    function populateTable() {
        console.log('🔧 Attempting to populate table...');
        
        const tableBody = document.getElementById('forsikringTableBody');
        console.log('Table body element:', tableBody);
        
        if (!tableBody) {
            console.error('❌ Table body not found!');
            return false;
        }
        
        console.log('✅ Table body found, generating HTML...');
        
        const html = forsikringData.map(item => {
            return `
                <tr>
                    <td><strong>${item.udbyder}</strong></td>
                    <td>${item.produkt}</td>
                    <td><span class="price">${item.pris_mdr}</span></td>
                    <td>${item.dækning}</td>
                    <td class="tilvalg">${item.tilvalg.join(', ')}</td>
                    <td><span class="campaign">${item.kampagne}</span></td>
                    <td><a href="${item.link}" class="btn btn-primary btn-sm" target="_blank" rel="nofollow">Se tilbud</a></td>
                </tr>
            `;
        }).join('');
        
        console.log('Generated HTML:', html);
        tableBody.innerHTML = html;
        console.log('✅ Table populated successfully with', forsikringData.length, 'rows');
        
        return true;
    }
    
    // Try multiple times with different approaches
    function tryToPopulate() {
        console.log('🎯 Attempting to populate table...');
        
        if (populateTable()) {
            console.log('🎉 Table populated successfully!');
            return;
        }
        
        // Try again after a short delay
        setTimeout(() => {
            console.log('🔄 Retrying table population...');
            if (populateTable()) {
                console.log('🎉 Table populated on retry!');
            } else {
                console.error('❌ Failed to populate table after retry');
            }
        }, 500);
    }
    
    // Try on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryToPopulate);
    } else {
        tryToPopulate();
    }
    
    // Also try on window load as backup
    window.addEventListener('load', () => {
        console.log('🔄 Window loaded, trying table population again...');
        tryToPopulate();
    });
    
    // Final attempt after 2 seconds
    setTimeout(() => {
        console.log('🔄 Final attempt to populate table...');
        tryToPopulate();
    }, 2000);
    
})();
