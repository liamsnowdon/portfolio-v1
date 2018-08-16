// Navigation
var navigationMenu = document.querySelector('.js-navigation-menu');
var navigationLinks = document.querySelector('.js-navigation-links');

navigationMenu.addEventListener('click', function() {
    navigationMenu.classList.toggle('navigation__menu--open');
    navigationLinks.classList.toggle('navigation__links--open');
});

// Projects carousel
var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
    autoplay: {
        delay: 5000
    },
    spaceBetween: 20
});

swiper.el.addEventListener("mouseenter", function(event) {
    swiper.autoplay.stop();
}, false);

swiper.el.addEventListener("mouseleave", function(event) {
    swiper.autoplay.start();
}, false);

// Contact form
var ContactForm = {
    fields: document.querySelectorAll('.js-field'),
    addErrorEvents: function() {
        for (var i = 0; i < this.fields.length; i++) {

            this.fields[i].addEventListener('invalid', function(event) {
                event.preventDefault();

                var errorMessage = this.nextElementSibling;
                errorMessage.style.display = 'block';
                errorMessage.innerText = 'This field is invalid.'
            });

            this.fields[i].addEventListener('input', function() {
                var errorMessage = this.nextElementSibling;
                if ('block' === errorMessage.style.display) {
                    errorMessage.style.display = 'none';
                }
            });
        }
    }
};

ContactForm.addErrorEvents();

var copyrightYear = new Date().getFullYear();
var copyrightEl = document.querySelector('.js-copyright-year');

copyrightEl.innerText = copyrightYear;