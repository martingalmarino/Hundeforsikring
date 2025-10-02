#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base URL del sitio
const baseUrl = 'https://www.hundeforsikring.net';

// Páginas principales
const mainPages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: 'forsikring/', priority: 0.9, changefreq: 'weekly' },
    { url: 'guide/', priority: 0.8, changefreq: 'monthly' },
    { url: 'faq/', priority: 0.8, changefreq: 'monthly' }
];

// Leer la lista de kommuner
const kommunerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/kommuner.json'), 'utf8'));

// Generar sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Agregar páginas principales
mainPages.forEach(page => {
    const url = page.url ? `${baseUrl}/${page.url}` : baseUrl;
    sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>2025-01-02</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
});

// Agregar páginas de kommuner
kommunerData.forEach(kommune => {
    // Convertir nombre de kommune a slug
    const slug = kommune.toLowerCase()
        .replace(/ø/g, 'o')
        .replace(/æ/g, 'ae')
        .replace(/å/g, 'aa')
        .replace(/ /g, '-');
    
    const url = `${baseUrl}/forsikring/${slug}/`;
    sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>2025-01-02</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`;
});

sitemap += `
</urlset>`;

// Escribir el sitemap
fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemap);

console.log('✅ Sitemap generado exitosamente');
console.log(`📊 Total de URLs: ${mainPages.length + kommunerData.length}`);
console.log(`📄 Archivo: sitemap.xml`);
