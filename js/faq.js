// JavaScript for FAQ page

document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
});

// Initialize FAQ functionality
function initializeFAQ() {
    initializeTabs();
    initializeFAQItems();
    initializeSearch();
}

// Initialize category tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const faqCategories = document.querySelectorAll('.faq-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            faqCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            button.classList.add('active');
            const targetCategory = document.getElementById(`${category}-faq`);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

// Initialize FAQ items (accordion functionality)
function initializeFAQItems() {
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

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            showAllFAQItems();
            return;
        }

        searchFAQItems(query);
    });
}

// Search FAQ items
function searchFAQItems(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    const activeCategory = document.querySelector('.faq-category.active');
    
    if (!activeCategory) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            const questionText = question.textContent.toLowerCase();
            const answerText = answer.textContent.toLowerCase();
            
            if (questionText.includes(query) || answerText.includes(query)) {
                item.style.display = 'block';
                highlightText(question, query);
                highlightText(answer, query);
            } else {
                item.style.display = 'none';
                removeHighlight(question);
                removeHighlight(answer);
            }
        }
    });
}

// Show all FAQ items
function showAllFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.style.display = 'block';
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        if (question) removeHighlight(question);
        if (answer) removeHighlight(answer);
    });
}

// Highlight search terms
function highlightText(element, query) {
    const text = element.innerHTML;
    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, '<mark>$1</mark>');
    element.innerHTML = highlightedText;
}

// Remove highlighting
function removeHighlight(element) {
    const text = element.innerHTML;
    const unhighlightedText = text.replace(/<mark>(.*?)<\/mark>/gi, '$1');
    element.innerHTML = unhighlightedText;
}

// Export functions for global use
window.initializeFAQ = initializeFAQ;

