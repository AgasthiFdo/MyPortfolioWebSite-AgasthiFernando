
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


