// Import AOS at the top of your HTML file
// <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
// <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    document.addEventListener('DOMContentLoaded', () => {
        const speakers = document.querySelectorAll('.speaker');

        speakers.forEach(speaker => {
            speaker.addEventListener('mouseenter', () => {
                // Añadir clase para efecto de highlight
                speaker.classList.add('highlight');

                // Crear y mostrar el nombre en un tooltip personalizado
                const name = speaker.getAttribute('data-name');
                const overlay = speaker.querySelector('.speaker-overlay');
                overlay.style.bottom = '0';
            });

            speaker.addEventListener('mouseleave', () => {
                // Remover clase de highlight
                speaker.classList.remove('highlight');

                // Ocultar el overlay
                const overlay = speaker.querySelector('.speaker-overlay');
                overlay.style.bottom = '-100%';
            });
        });
    });

    // Animaciones para la sección de ponentes
    document.addEventListener('DOMContentLoaded', () => {
        const speakers = document.querySelectorAll('.speaker');

        // Función para añadir efecto de entrada con retardo
        const addEntryEffect = () => {
            speakers.forEach((speaker, index) => {
                speaker.style.opacity = '0';
                speaker.style.transform = 'translateY(50px)';

                setTimeout(() => {
                    speaker.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    speaker.style.opacity = '1';
                    speaker.style.transform = 'translateY(0)';
                }, index * 200);
            });
        };

        // Intersection Observer para activar las animaciones
        const speakersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addEntryEffect();
                    speakersObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observar la sección de ponentes
        const speakersSection = document.querySelector('.speakers-container');
        if (speakersSection) {
            speakersObserver.observe(speakersSection);
        }

        // Efecto hover mejorado
        speakers.forEach(speaker => {
            speaker.addEventListener('mouseenter', () => {
                const overlay = speaker.querySelector('.speaker-overlay');
                const name = speaker.getAttribute('data-name');
                const role = speaker.getAttribute('data-role');

                overlay.innerHTML = `
                <h3>${name}</h3>
                <p>${role || 'Ponente destacado'}</p>
            `;
            });
        });
    });




    AOS.init({
        duration: 1000,
        once: true
    });

    const bandCards = document.querySelectorAll('.band-card');
    const modal = document.getElementById('videoModal');
    const videoIframe = modal.querySelector('iframe');
    const closeModal = modal.querySelector('.close-modal');

    bandCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.dataset.video;
            videoIframe.src = videoUrl;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        videoIframe.src = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoIframe.src = '';
        }
    });





    // Enhanced parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.35;
                heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    // Intersection Observer for lazy loading
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    // Apply lazy loading to images
    document.querySelectorAll('img[data-src]').forEach(lazyLoad);

    // Animated counter for statistics (if needed)
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 10);
    };

    // Navbar scroll behavior
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Form handling with validation
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your form submission logic here
        });
    }
});
