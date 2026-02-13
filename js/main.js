document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       Smooth Scroll
    ===================================== */

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


    /* =====================================
       Active Menu
    ===================================== */

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


    /* =====================================
       Burger Menu + Overlay
    ===================================== */

    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");
    const overlay = document.getElementById("overlay");

    function openMenu() {
        navMenu.classList.add("open");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navMenu.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";
    }

    burger.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрытие по клику вне меню
    overlay.addEventListener("click", closeMenu);

    // Закрытие при клике на пункт меню
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    /* =====================================
       Swipe to Close
    ===================================== */

    let startX = 0;
    let endX = 0;

    navMenu.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    navMenu.addEventListener("touchmove", e => {
        endX = e.touches[0].clientX;
    });

    navMenu.addEventListener("touchend", () => {
        if (startX - endX > 70) { // свайп влево больше 70px
            closeMenu();
        }
    });

});
