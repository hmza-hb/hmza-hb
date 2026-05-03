document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuBtn && closeMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.add('open');
        });

        closeMenuBtn.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Show corresponding section
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('open');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeButton('light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    function updateThemeButton(theme) {
        if (theme === 'light') {
            themeToggle.textContent = 'Dark Mode';
        } else {
            themeToggle.textContent = 'Light Mode';
        }
    }

    // Parallax effect for gradient orbs
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        const orb3 = document.querySelector('.orb-3');

        if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        if (orb2) orb2.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
        if (orb3) orb3.style.transform = `translate(${x * 20}px, ${y * -20}px)`;
    });

    initBorderGlow();
});

function initBorderGlow() {
    const cards = document.querySelectorAll('.border-glow-card');
    if (!cards.length) return;

    const getCenterOfElement = (el) => {
        const rect = el.getBoundingClientRect();
        return [rect.width / 2, rect.height / 2];
    };

    const getEdgeProximity = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = cx / Math.abs(dx);
        if (dy !== 0) ky = cy / Math.abs(dy);
        return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    };

    const getCursorAngle = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        if (dx === 0 && dy === 0) return 0;
        const radians = Math.atan2(dy, dx);
        let degrees = radians * (180 / Math.PI) + 90;
        if (degrees < 0) degrees += 360;
        return degrees;
    };

    cards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const edge = getEdgeProximity(card, x, y);
            const angle = getCursorAngle(card, x, y);

            card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
            card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--edge-proximity', `0`);
        });
    });
}
