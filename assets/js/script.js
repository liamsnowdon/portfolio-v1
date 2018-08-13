var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
    autoplay: {
        delay: 5000
    }
});

swiper.el.addEventListener("mouseenter", function(event) {
    swiper.autoplay.stop();
}, false);

swiper.el.addEventListener("mouseleave", function(event) {
    swiper.autoplay.start();
}, false);