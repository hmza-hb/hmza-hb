// Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction: Parallax effect for the background text on scroll
    const bgTextName = document.querySelector('.script-text.word-name-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (bgTextName) {
            // Slight upward movement as user scrolls down for parallax effect
            bgTextName.style.transform = `rotate(-10deg) translateY(${-80 - (scrolled * 0.1)}px)`;
        }
    });

    // Add visual reveal animations here later if needed
});
