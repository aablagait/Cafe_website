// ===============================
// Smooth scroll
// ===============================

document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===============================
// Active menu (Hero + Sections)
// ===============================

const menuLinks = document.querySelectorAll('.nav a');
const observedSections = document.querySelectorAll('section[id], header[id]');

let currentActive = null;

const menuObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const id = entry.target.getAttribute('id');

            if (currentActive !== id) {
                currentActive = id;

                menuLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }

        }

    });

}, {
    threshold: 0.45
});

observedSections.forEach(section => {
    menuObserver.observe(section);
});


// ===============================
// Reveal animation on scroll
// ===============================

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });

}, {
    threshold: 0.45
});

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
    revealObserver.observe(section);
});
