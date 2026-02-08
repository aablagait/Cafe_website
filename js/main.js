// === Smooth scroll ===
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Active menu via IntersectionObserver ===

const menuLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section[id]');

const menuObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const id = entry.target.getAttribute('id');

            menuLinks.forEach(link => {
                link.classList.remove('active');

                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

}, {
    threshold: 0.4   // секция считается активной когда видна на 40%
});

sections.forEach(section => {
    menuObserver.observe(section);
});



// === Reveal on scroll ===
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

