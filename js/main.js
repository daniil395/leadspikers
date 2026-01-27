/**
 * Leadspikers B2B Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Header Scroll Effect
    initHeaderScroll();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Smooth Scroll for Anchor Links
    initSmoothScroll();
    
    // Fade In Animation on Scroll
    initScrollAnimations();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .case-card, .value-card, .problem-card, .process-step');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
