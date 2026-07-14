gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', (event) => {

    // ==================== ANIMACIÓN DE LAS TARJETAS (GSAP) ====================
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        const numeroTarjeta = index + 1;

        gsap.from(`.card${numeroTarjeta}`, {
            y: 30,
            x: (numeroTarjeta % 2 === 0 ? 30 : -30),
            opacity: 0,
            scrollTrigger: {
                trigger: `.card${numeroTarjeta}`,
                start: 'top 80%',
                end: 'top center',
                scrub: true
            }
        });
    });

    // ==================== ANIMACIÓN DE LAS IMÁGENES CIRCULARES ====================
    const imagenesCirculares = document.querySelectorAll('.img-circular');

    imagenesCirculares.forEach((img, index) => {
        const numeroImagen = index + 1;
        const tarjetaContenedora = img.closest('.card');

        gsap.from(img, {
            scale: 0,               
            rotation: (numeroImagen % 2 === 0 ? 180 : -180), 
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: tarjetaContenedora, 
                start: "top 75%",            
                toggleActions: "play none none none" 
            }
        });
    });

    // ==================== CÓDIGO DEL CARRUSEL (CARD 4) ====================
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Asegura que el índice de la diapositiva rote cíclicamente
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remueve y agrega la clase active para mostrar el elemento deseado
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualiza el estado de los indicadores de puntos
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Eventos para botones flechas
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });
    }

    // Eventos para interactuar con los puntos indicadores
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-slide'));
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Desplazamiento automático cada 5 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Iniciar temporizador automático
    if (slides.length > 0) {
        startAutoSlide();
    }
});