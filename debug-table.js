// Debug script to test table population
console.log('🔍 DEBUG: Testing table population...');

// Check if we're on the right page
console.log('Current URL:', window.location.href);
console.log('Current pathname:', window.location.pathname);

// Check if elements exist
const tableBody = document.getElementById('forsikringTableBody');
console.log('Table body element:', tableBody);

// Check if forsikringData exists
console.log('forsikringData:', window.forsikringData || 'undefined');
console.log('forsikringData length:', window.forsikringData ? window.forsikringData.length : 'undefined');

// Check if populateForsikringTable function exists
console.log('populateForsikringTable function:', typeof window.populateForsikringTable);

// Try to populate manually
if (typeof window.populateForsikringTable === 'function') {
    console.log('🔧 Manually calling populateForsikringTable...');
    window.populateForsikringTable();
} else {
    console.log('❌ populateForsikringTable function not found');
}

// Check all elements with "table" in ID
console.log('All table-related elements:', document.querySelectorAll('[id*="table"]'));

// Check if forsikring.js is loaded
console.log('Scripts loaded:', Array.from(document.scripts).map(s => s.src));
