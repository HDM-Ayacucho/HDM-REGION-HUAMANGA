const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const menuIcon = mobileMenu.querySelector('i');

        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            if (navMenu.classList.contains('show')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Cambio de color al hacer scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;
                if (sectionTop < window.innerHeight && sectionBottom > 0) {
                    section.style.backgroundColor = section.classList.contains('section1') ? '#ff6b6b' : '#4ecdc4';
                }
            });
        });