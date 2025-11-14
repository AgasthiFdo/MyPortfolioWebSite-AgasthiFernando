
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');


menuIcon.addEventListener('click', () => {

    menuIcon.classList.toggle('bx-x');

    navbar.classList.toggle('open');
});


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {

        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');


        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                history.pushState(null, null, href);
            }
        }
    });
});


window.addEventListener('scroll', () => {
    // close mobile menu if open
    if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    }


    const scrollPos = window.scrollY || window.pageYOffset;
    sections.forEach(sec => {
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= offset && scrollPos < offset + height) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.navbar a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});


(function fillHeroSpans() {


    try {
        const heroH1Spans = document.querySelectorAll('.home-content h1 span');

        if (heroH1Spans[0]) heroH1Spans[0].textContent = '';

        if (heroH1Spans[1]) heroH1Spans[1].textContent = 'Fernando';
    } catch (err) {

        console.warn('Hero spans fill skipped:', err);
    }
})();


menuIcon.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        menuIcon.click();
    }
});


window.addEventListener('load', () => {

    window.dispatchEvent(new Event('scroll'));
});
