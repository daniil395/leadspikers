// ============================================
// LEADSPIKERS PRESENTATION - Interactive Script
// Keyboard and touch navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    
    document.addEventListener('keydown', (e) => {
        const slides = document.querySelectorAll('.slide');
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        
        let currentSlideIndex = 0;
        slides.forEach((slide, index) => {
            if (slide.offsetTop <= currentScroll + windowHeight / 2) {
                currentSlideIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            if (currentSlideIndex < slides.length - 1) {
                slides[currentSlideIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSlideIndex > 0) {
                slides[currentSlideIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Home key - go to first slide
        if (e.key === 'Home') {
            e.preventDefault();
            slides[0].scrollIntoView({ behavior: 'smooth' });
        }
        
        // End key - go to last slide
        if (e.key === 'End') {
            e.preventDefault();
            slides[slides.length - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // ============================================
    // TOUCH SWIPE NAVIGATION (Mobile)
    // ============================================
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const slides = document.querySelectorAll('.slide');
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        
        let currentSlideIndex = 0;
        slides.forEach((slide, index) => {
            if (slide.offsetTop <= currentScroll + windowHeight / 2) {
                currentSlideIndex = index;
            }
        });
        
        const swipeThreshold = 50;
        
        if (touchStartY - touchEndY > swipeThreshold) {
            // Swipe up - next slide
            if (currentSlideIndex < slides.length - 1) {
                slides[currentSlideIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        if (touchEndY - touchStartY > swipeThreshold) {
            // Swipe down - previous slide
            if (currentSlideIndex > 0) {
                slides[currentSlideIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    // ============================================
    // SMOOTH CARD HOVER OPTIMIZATION
    // ============================================
    
    const interactiveElements = document.querySelectorAll('.card, .stat, .case-card, .metric, .pricing-card, .benefit-item, .client-logo');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.willChange = 'transform, box-shadow';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.willChange = 'auto';
        });
    });
    
});
