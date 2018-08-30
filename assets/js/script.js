// Navigation
var Navigation = {
    data: {
        scroll: new SmoothScroll('a[href*="#"]', {
            header: '.navigation'
        }),
        pageOverlay: document.querySelector('.js-page-overlay'),
        navigationMenu: document.querySelector('.js-navigation-menu'),
        navigationLinks: document.querySelector('.js-navigation-links'),
        navigationItems: document.querySelectorAll('.js-navigation-item')
    },
    methods: {
        addEventListeners: function() {
            Navigation.data.navigationMenu.addEventListener('click', function() {
                Navigation.data.navigationMenu.classList.toggle('navigation__menu--open');
                Navigation.data.navigationLinks.classList.toggle('navigation__links--open');
                Navigation.data.pageOverlay.classList.toggle('page-overlay--active');

            });

            for (var i = 0; i < Navigation.data.navigationItems.length; i++) {
                Navigation.data.navigationItems[i].addEventListener('click', function() {
                    Navigation.data.navigationMenu.classList.remove('navigation__menu--open');
                    Navigation.data.navigationLinks.classList.remove('navigation__links--open');
                    Navigation.data.pageOverlay.classList.remove('page-overlay--active');
                })
            }
        }
    }
};

Navigation.methods.addEventListeners();

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