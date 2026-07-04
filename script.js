gsap.registerPlugin(ScrollTrigger);
const cards = document.querySelectorAll('.card');

document.addEventListener('DOMContentLoaded', (event) => {
    cards.forEach((card, index)=> {
        gsap.from(`.card${index}`, {
            y: 30,
            x: (index %2 === 0 ? 30 : -30),
            opacity: 0,
            scrollTrigger: {
                trigger: `.card${index}`,
                end: 'top center',
                scrub: true
            }
        })
    })
})