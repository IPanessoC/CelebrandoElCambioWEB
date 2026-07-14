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
    
    // ==================== ANIMACIÓN DE LAS IMÁGENES CIRCULARES (GSAP) ====================
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

    // ==================== CONTROL DEL CARRUSEL EN PORCENTAJES (CORREGIDO) ====================
    const track = document.getElementById('carrusel-track');
    const btnPrev = document.getElementById('btn-galeria-prev');
    const btnNext = document.getElementById('btn-galeria-next');
    
    const subCards = document.querySelectorAll('.sub-card-mixta');
    const totalSubCards = subCards.length;
    
    if (track && btnPrev && btnNext && totalSubCards > 0) {
        let posicionActual = 0; 

        function actualizarCarrusel() {
            // CORRECCIÓN MATEMÁTICA: Como el track mide 400%, cada tarjeta mide el 25% de la tira completa.
            // Al multiplicar la posición actual por -25%, el carrusel avanza exactamente una tarjeta a la vez de forma perfecta.
            const porcentajeDesplazamiento = posicionActual * 25;
            track.style.transform = `translateX(-${porcentajeDesplazamiento}%)`;
        }

        btnNext.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (posicionActual < totalSubCards - 1) {
                posicionActual++; 
            } else {
                posicionActual = 0; 
            }
            actualizarCarrusel();
        });

        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (posicionActual > 0) {
                posicionActual--; 
            } else {
                posicionActual = totalSubCards - 1; 
            }
            actualizarCarrusel();
        });

        window.addEventListener('resize', actualizarCarrusel);
    }
});
