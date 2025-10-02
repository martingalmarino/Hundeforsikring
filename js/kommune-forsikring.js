// JavaScript for kommune-specific forsikring pages

document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be loaded
    setTimeout(() => {
        initializeKommuneForsikring();
    }, 1000);
});

// Initialize kommune forsikring page
function initializeKommuneForsikring() {
    const kommune = getKommuneFromURL();
    if (!kommune) {
        console.error('Could not determine kommune from URL');
        return;
    }

    // Update page content with kommune-specific data
    updateKommuneContent(kommune);
    populateForsikringTable(kommune);
    updateHeroStats(kommune);
    initializeFAQ();
}

// Get kommune from URL
function getKommuneFromURL() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const kommuneSlug = segments[segments.length - 2]; // Get second to last segment
    
    // Convert slug back to kommune name
    const kommune = kommuneSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/O/g, 'Ø')
        .replace(/Ae/g, 'Æ')
        .replace(/A/g, 'Å');
    
    return kommune;
}

// Update kommune-specific content
function updateKommuneContent(kommune) {
    // Update page title and meta descriptions
    document.title = document.title.replace('{KOMMUNE}', kommune);
    
    // Update all {KOMMUNE} placeholders
    const kommuneElements = document.querySelectorAll('[data-kommune]');
    kommuneElements.forEach(element => {
        element.textContent = kommune;
    });
    
    // Update content with kommune name
    const contentElements = document.querySelectorAll('h1, h2, h3, p, li');
    contentElements.forEach(element => {
        if (element.textContent.includes('{KOMMUNE}')) {
            element.textContent = element.textContent.replace(/{KOMMUNE}/g, kommune);
        }
    });
}

// Populate forsikring table for specific kommune
function populateForsikringTable(kommune) {
    const tableContainer = document.getElementById('forsikringTableContainer');
    if (!tableContainer || !forsikringData) return;

    const forsikringForKommune = getForsikringByKommune(kommune);
    
    if (forsikringForKommune.length === 0) {
        tableContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-info-circle"></i>
                <h3>Ingen forsikringsselskaber fundet</h3>
                <p>Vi har ikke fundet forsikringsselskaber, der dækker ${kommune}. Prøv at kontakte forsikringsselskaberne direkte.</p>
            </div>
        `;
        return;
    }

    // Sort by price (cheapest first)
    const sortedData = [...forsikringForKommune].sort((a, b) => a.pris_mdr - b.pris_mdr);

    const tableHTML = `
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
                    ${sortedData.map(item => `
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

    tableContainer.innerHTML = tableHTML;
}

// Update hero stats with kommune-specific data
function updateHeroStats(kommune) {
    const heroStats = document.getElementById('heroStats');
    if (!heroStats) return;

    const forsikringForKommune = getForsikringByKommune(kommune);
    const cheapestForsikring = getCheapestForsikring(kommune);
    
    if (forsikringForKommune.length === 0) {
        heroStats.innerHTML = `
            <div class="stat">
                <span class="stat-number">0</span>
                <span class="stat-label">Forsikringsselskaber</span>
            </div>
            <div class="stat">
                <span class="stat-number">Kontakt</span>
                <span class="stat-label">Direkte</span>
            </div>
            <div class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">Gratis sammenligning</span>
            </div>
        `;
        return;
    }

    const cheapestPrice = cheapestForsikring ? formatMonthlyPrice(cheapestForsikring.pris_mdr) : 'Kontakt';

    heroStats.innerHTML = `
        <div class="stat">
            <span class="stat-number">${forsikringForKommune.length}</span>
            <span class="stat-label">Forsikringsselskaber</span>
        </div>
        <div class="stat">
            <span class="stat-number">${cheapestPrice}</span>
            <span class="stat-label">Billigste pris</span>
        </div>
        <div class="stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Gratis sammenligning</span>
        </div>
    `;
}

// Initialize FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.fa-chevron-down');
                    if (otherAnswer && otherIcon) {
                        otherAnswer.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}

// Export functions for global use
window.initializeKommuneForsikring = initializeKommuneForsikring;

