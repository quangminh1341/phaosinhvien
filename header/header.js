// header/header.js

function updateContactLogo(theme) {
    const contactLogo = document.querySelector('.contact-info-card .contact-logo img');
    if (contactLogo) {
        if (theme === 'light') {
            contactLogo.src = 'images/logo-light.png';
        } else {
            contactLogo.src = 'images/logo.png';
        }
    }
}

function initializeHeader() {
    // --- LOGIC CHO MENU HAMBURGER ---
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            siteNav.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open');
        });
    }

    // --- LOGIC CHO DARK/LIGHT MODE ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        updateContactLogo('light');
    } else {
        document.body.classList.remove('light-mode');
        updateContactLogo('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            let theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            updateContactLogo(theme);
        });
    }
}