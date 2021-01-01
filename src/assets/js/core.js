(function () {
    var Navigation = {
        initialise: function () {
            this.scroll = new SmoothScroll('a[href*="#"]', {
                header: '.navigation'
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
            this.navigationMenu.classList.toggle('navigation__menu--open');
            this.navigationLinks.classList.toggle('navigation__links--open');
            this.pageOverlay.classList.toggle('page-overlay--active');
        },
    
        closeNavigation: function () {
            this.navigationMenu.classList.remove('navigation__menu--open');
            this.navigationLinks.classList.remove('navigation__links--open');
            this.pageOverlay.classList.remove('page-overlay--active');
        }
    };
    
    Navigation.initialise();
})();
