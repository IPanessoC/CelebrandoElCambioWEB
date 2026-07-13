gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', (event) => {
    
    // ==================== ANIMACIÓN DE LAS TARJETAS ====================
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
    // Seleccionamos todas las imágenes circulares de la página
    const imagenesCirculares = document.querySelectorAll('.img-circular');

    imagenesCirculares.forEach((img, index) => {
        const numeroImagen = index + 1;

        // Opción A: Buscamos la tarjeta contenedora más cercana automáticamente
        const tarjetaContenedora = img.closest('.card'); 

        // Alternativa Opción B: Si prefieres usar clases estrictas (.card1, .card2), descomenta la línea de abajo:
        // const tarjetaContenedora = `.card${numeroImagen}`;

        gsap.from(img, {
            scale: 0,               // Inicia invisible
            rotation: (numeroImagen % 2 === 0 ? 180 : -180), // ¡NUEVO!: Las pares giran a la derecha, las impares a la izquierda
            opacity: 0,             
            duration: 1.5,          
            ease: "back.out(1.7)",  
            scrollTrigger: {
                trigger: tarjetaContenedora, // Se dispara cuando SU propia tarjeta entra en pantalla
                start: "top 75%",            // Un poco antes de que la tarjeta suba por completo
                toggleActions: "play none none none" // Se ejecuta al entrar
            }
        });
    });
});



