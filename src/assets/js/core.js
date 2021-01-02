(function () {
    ScrollReveal({
        duration: 1200,
        delay: 100,
        viewOffset: {
            top: 60
        }
    });

    ScrollReveal().reveal('.js-profile-text', { interval: 200, distance: '100px', origin: 'right' });
    ScrollReveal().reveal('.js-profile-icon', { delay: 400, interval: 200, distance: '50px', origin: 'bottom' });
    ScrollReveal().reveal('.js-profile-picture', { delay: 600, distance: '50px', origin: 'bottom' });

    ScrollReveal().reveal('.js-skill', { interval: 200, distance: '50px', origin: 'top' });
    ScrollReveal().reveal('.js-project-left', { delay: 400, distance: '200px', origin: 'left' });
    ScrollReveal().reveal('.js-project-right', { delay: 400, distance: '200px', origin: 'right' });
    

    var Navigation = {
        initialise: function () {
            this.scroll = new SmoothScroll('a[href*="#"]', {
                header: '.js-navigation'
            }),
            this.pageOverlay = document.querySelector('.js-page-overlay'),
            this.navigationMenu = document.querySelector('.js-navigation-menu'),
            this.navigationLinks = document.querySelector('.js-navigation-links'),
            this.navigationItems = document.querySelectorAll('.js-navigation-item')

            this.connectEvents();
        },
    
        connectEvents: function () {
            var self = this;
    
            this.navigationMenu.addEventListener('click', this.toggleNavigation.bind(this));
    
            this.navigationItems.forEach(function (item) {
                item.addEventListener('click', self.closeNavigation.bind(self));
            });
    
            window.addEventListener('resize', function () {
                if (window.innerWidth >= 768) {
                    self.closeNavigation();
                }
            });
        },
    
        toggleNavigation: function () {
            this.navigationMenu.classList.toggle('is-active');
            this.navigationLinks.classList.toggle('is-active');
            this.pageOverlay.classList.toggle('is-active');
        },
    
        closeNavigation: function () {
            this.navigationMenu.classList.remove('is-active');
            this.navigationLinks.classList.remove('is-active');
            this.pageOverlay.classList.remove('is-active');
        }
    };
    
    Navigation.initialise();
})();
