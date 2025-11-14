// script.js

// ====== Elements ======
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

// ====== Mobile menu toggle ======
menuIcon.addEventListener('click', () => {
    // icon change (uses boxicons class toggle)
    menuIcon.classList.toggle('bx-x');
    // show/hide nav (we add/remove .open class; CSS uses .navbar rules — you can style .navbar.open if desired)
    navbar.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // let the browser handle the anchor, but close the mobile menu
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');

        // Smooth scroll fallback: if browser doesn't respect CSS scroll-behavior
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // update URL hash without jumping
                history.pushState(null, null, href);
            }
        }
    });
});

// ====== Close menu on window scroll and run scroll-spy ======
window.addEventListener('scroll', () => {
    // close mobile menu if open
    if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    }

    // scroll spy: mark which section is in view and set active link
    const scrollPos = window.scrollY || window.pageYOffset;
    sections.forEach(sec => {
        const offset = sec.offsetTop - 160; // adjust trigger point
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= offset && scrollPos < offset + height) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.navbar a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

// ====== Optional: fill the empty spans in the hero area (so colored span shows text) ======
(function fillHeroSpans() {
    // There are a couple of span elements in the top headings — populate them cleanly.
    // Adjust these strings if you want different displayed names.
    try {
        const heroH1Spans = document.querySelectorAll('.home-content h1 span');
        // "My Name is <span>" -> set to "Arun Fernando"
        if (heroH1Spans[0]) heroH1Spans[0].textContent = 'Arun Fernando';
        // "Agasthi <span>" -> set to "Fernando" (or any surname)
        if (heroH1Spans[1]) heroH1Spans[1].textContent = 'Fernando';
    } catch (err) {
        // fail silently if structure different
        console.warn('Hero spans fill skipped:', err);
    }
})();

// ====== Accessibility: keyboard toggle for menu icon ======
menuIcon.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        menuIcon.click();
    }
});

// ====== Small helper: highlight the Home link on load if at top ======
window.addEventListener('load', () => {
    // trigger scroll event once so scroll-spy initializes
    window.dispatchEvent(new Event('scroll'));
});
