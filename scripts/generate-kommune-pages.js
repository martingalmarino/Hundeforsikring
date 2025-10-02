const fs = require('fs');
const path = require('path');

// Read kommuner data
const kommunerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/kommuner.json'), 'utf8'));

// Read forsikring data
const forsikringData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/hundeforsikring.json'), 'utf8'));

// Template for kommune pages
const kommuneTemplate = `<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hundeforsikring i {KOMMUNE} 2025 | Sammenlign Priser</title>
    <meta name="description" content="Sammenlign hundeforsikring priser i {KOMMUNE}. Find den bedste og billigste hundeforsikring fra alle udbydere i {KOMMUNE} kommune.">
    <meta name="keywords" content="hundeforsikring {KOMMUNE}, hundeansvarsforsikring {KOMMUNE}, sammenlign hundeforsikring {KOMMUNE}">
    <meta name="google-site-verification" content="tu-codigo-de-verificacion-aqui" />
    <link rel="canonical" href="https://www.hundeforsikring.net/forsikring/{KOMMUNE_SLUG}/">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" href="/favicon.ico">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Hundeforsikring i {KOMMUNE} 2025 | Sammenlign Priser">
    <meta property="og:description" content="Sammenlign hundeforsikring priser i {KOMMUNE}. Find den bedste og billigste hundeforsikring fra alle udbydere.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://hundeforsikring.dk/forsikring/{KOMMUNE_SLUG}/">
    
                <link rel="stylesheet" href="../../css/style.css?v=20250102v3">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Hundeforsikring i {KOMMUNE} 2025",
      "description": "Sammenlign hundeforsikring priser i {KOMMUNE} kommune",
      "url": "https://hundeforsikring.dk/forsikring/{KOMMUNE_SLUG}/",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Hundeforsikringsselskaber i {KOMMUNE}",
        "description": "Sammenligning af hundeforsikringsselskaber i {KOMMUNE} kommune"
      }
    }
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="../../">
                        <i class="fas fa-paw"></i>
                        <span>Hundeforsikring.dk</span>
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="../../forsikring/" class="nav-link">Sammenlign</a></li>
                    <li><a href="../../guide/" class="nav-link">Guide</a></li>
                    <li><a href="../../faq/" class="nav-link">FAQ</a></li>
                </ul>
                <div class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-content">
            <div class="mobile-menu-header">
                <h3>Menu</h3>
                <button class="mobile-menu-close" id="mobileMenuClose">&times;</button>
            </div>
            <ul class="mobile-menu-nav">
                <li><a href="../../forsikring/">Sammenlign</a></li>
                <li><a href="../../guide/">Guide</a></li>
                <li><a href="../../faq/">FAQ</a></li>
            </ul>
        </div>
    </div>

    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
        <div class="container">
            <div class="breadcrumb">
                <a href="../../">Hjem</a> <span>></span> <a href="../">Hundeforsikring</a> <span>></span> <span>{KOMMUNE}</span>
            </div>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">
                    Hundeforsikring i <span class="highlight">{KOMMUNE}</span> 2025
                </h1>
                <p class="hero-subtitle">
                    I {KOMMUNE} er hundeansvarsforsikring obligatorisk. Sammenlign udbydere som Agria og Tryg for at finde det billigste tilbud.
                </p>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">{CHEAPEST_PRICE}</span>
                        <span class="stat-label">Billigste pris</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">{AVAILABLE_PROVIDERS}</span>
                        <span class="stat-label">Udbydere tilgængelige</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">Obligatorisk</span>
                        <span class="stat-label">I hele Danmark</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Comparison Table -->
            <section class="comparison-section">
                <div class="section-header">
                    <h2 class="section-title">Hundeforsikringsselskaber i {KOMMUNE}</h2>
                    <p class="section-subtitle">Alle priser er fra 2025 og kan variere afhængigt af hundens race og alder.</p>
                </div>
                
                <!-- Desktop Table -->
                <div class="table-container">
                    <table class="comparison-table" id="forsikringTable">
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
                        <tbody id="forsikringTableBody">
                            <!-- Populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
                
                <!-- Mobile Cards Layout -->
                <div class="mobile-cards" id="mobileCards">
                    <!-- Populated by JavaScript -->
                </div>
            </section>

            <!-- SEO Content -->
            <section class="seo-content">
                <h2>Hundeforsikring i {KOMMUNE} kommune</h2>
                <p>I {KOMMUNE} er hundeansvarsforsikring obligatorisk for alle hundeejere. Dette betyder, at du skal have en gyldig forsikring, der dækker mindst 3.000.000 kr. i skadeserstatning, hvis din hund forvolder skade på andre personer, dyr eller ejendom.</p>

                <h3>Hvad koster hundeforsikring i {KOMMUNE}?</h3>
                <p>Priserne på hundeforsikring i {KOMMUNE} varierer mellem de forskellige udbydere. De billigste grundforsikringer starter fra {CHEAPEST_PRICE}, mens mere omfattende pakker med sygeforsikring og tanddækning kan koste op til 99 kr./md.</p>

                <h3>Populære udbydere i {KOMMUNE}</h3>
                <p>Nogle af de mest populære forsikringsselskaber i {KOMMUNE} inkluderer Agria, Tryg, Alka Forsikring og GF Forsikring. Hver udbyder har sine egne fordele og priser, så det er vigtigt at sammenligne, før du vælger.</p>

                <h3>Hvordan vælger jeg den rigtige hundeforsikring i {KOMMUNE}?</h3>
                <p>Når du skal vælge hundeforsikring i {KOMMUNE}, skal du overveje din hunds race, alder og sundhedstilstand. Nogle racer anses for mere risikable end andre, hvilket kan påvirke præmien. Det er også vigtigt at overveje, om du har brug for tilvalg som sygeforsikring eller tanddækning.</p>

                <h3>Ofte stillede spørgsmål om hundeforsikring i {KOMMUNE}</h3>
                
                <div class="faq-item">
                    <h4>Er hundeforsikring virkelig obligatorisk i {KOMMUNE}?</h4>
                    <p>Ja, hundeansvarsforsikring er obligatorisk i hele Danmark, inklusive {KOMMUNE}. Uden forsikring kan du få bøder, og kommunen kan kræve, at hunden fjernes.</p>
                </div>

                <div class="faq-item">
                    <h4>Hvor meget koster hundeforsikring i {KOMMUNE}?</h4>
                    <p>Priserne varierer, men grundforsikring starter typisk fra {CHEAPEST_PRICE} i {KOMMUNE}. Prisen afhænger af hundens race, alder og den valgte dækning.</p>
                </div>

                <div class="faq-item">
                    <h4>Kan jeg skifte forsikringsselskab i {KOMMUNE}?</h4>
                    <p>Ja, du kan altid skifte forsikringsselskab. Sørg for at have den nye forsikring aktiv, før du opsiger den gamle, så din hund altid er dækket.</p>
                </div>

                <div class="faq-item">
                    <h4>Hvilke udbydere er tilgængelige i {KOMMUNE}?</h4>
                    <p>De fleste store forsikringsselskaber som Agria, Tryg, Alka og GF Forsikring er tilgængelige i {KOMMUNE}. Nogle specialiserede udbydere som Dyrekassen Danmark kan også være tilgængelige.</p>
                </div>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Hundeforsikring.dk</h3>
                    <p>Danmarks førende sammenligning af hundeforsikring priser.</p>
                </div>
                
                <div class="footer-section">
                    <h4>Hundeforsikring</h4>
                    <ul>
                        <li><a href="../../forsikring/">Sammenlign forsikring</a></li>
                        <li><a href="../../guide/">Guide til forsikring</a></li>
                        <li><a href="../../faq/">Ofte stillede spørgsmål</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Kommuner</h4>
                    <ul>
                        <li><a href="../københavn/">København</a></li>
                        <li><a href="../aarhus/">Aarhus</a></li>
                        <li><a href="../odense/">Odense</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Om os</h4>
                    <ul>
                        <li><a href="../../om-os/">Om Hundeforsikring.dk</a></li>
                        <li><a href="../../kontakt/">Kontakt os</a></li>
                        <li><a href="../../privatlivspolitik/">Privatlivspolitik</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Hundeforsikring.dk. Alle rettigheder forbeholdes.</p>
                <p>Hundeforsikring.dk er et uafhængigt sammenligningssite for hundeejere i Danmark.</p>
            </div>
        </div>
    </footer>

                <script src="../../js/main.js?v=20250102v6"></script>
                <script src="../../js/kommune-forsikring.js?v=20250102v6"></script>
    <script>
        // Set kommune-specific data
        window.currentKommune = '{KOMMUNE}';
        window.currentKommuneSlug = '{KOMMUNE_SLUG}';
    </script>
</body>
</html>`;

// Function to create slug from kommune name
function createSlug(kommune) {
    return kommune.toLowerCase()
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'a')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Function to get cheapest price for a kommune
function getCheapestPrice(kommune) {
    const availableForsikring = forsikringData.filter(item => 
        item.kommuner && item.kommuner.includes(kommune)
    );
    
    if (availableForsikring.length === 0) return "75 kr./md"; // Default price
    
    const cheapest = availableForsikring.reduce((cheapest, current) => {
        const currentPrice = parseInt(current.pris_mdr.replace(/[^\d]/g, ''));
        const cheapestPrice = parseInt(cheapest.pris_mdr.replace(/[^\d]/g, ''));
        return currentPrice < cheapestPrice ? current : cheapest;
    });
    
    return cheapest.pris_mdr;
}

// Function to count available providers for a kommune
function getAvailableProviders(kommune) {
    // All providers are available in all kommuner
    return forsikringData.length;
}

// Generate pages for each kommune
kommunerData.forEach(kommune => {
    const slug = createSlug(kommune);
    const cheapestPrice = getCheapestPrice(kommune);
    const availableProviders = getAvailableProviders(kommune);
    
    // Create directory if it doesn't exist
    const dirPath = path.join(__dirname, '../forsikring', slug);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Generate HTML content
    const htmlContent = kommuneTemplate
        .replace(/{KOMMUNE}/g, kommune)
        .replace(/{KOMMUNE_SLUG}/g, slug)
        .replace(/{CHEAPEST_PRICE}/g, cheapestPrice)
        .replace(/{AVAILABLE_PROVIDERS}/g, availableProviders);
    
    // Write file
    const filePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    
    console.log(`Generated page for ${kommune} (${slug})`);
});

console.log(`Generated ${kommunerData.length} kommune pages successfully!`);
