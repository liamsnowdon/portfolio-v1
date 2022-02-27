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

    var RecentPosts = {
        postPodTemplate: '' +
            '<div class="c-post-pod js-post-pod">' +
                '<a class="c-post-pod__image-cont" href="https://blog.liamsnowdon.uk/posts/<% FILE %>" target="_blank">' +
                    '<img class="c-post-pod__image" src="https://blog.liamsnowdon.uk/assets/<% THUMBNAIL_IMAGE_URL %>" alt="<% TITLE %>" />' +
                '</a>' +
                '<div class="c-post-pod__content">' +
                    '<span class="ws-no-wrap d-block mb-10 fw-700"><% DATE_POSTED %> | ' +
                        '<a class="c-post-pod__category" href="https://blog.liamsnowdon.uk/categories/<% CATEGORY_FILE %>" target="_blank"><% CATEGORY_NAME %></a>' +
                    '</span>' +
                    
                    '<h6 class="c-post-pod__title"><% TITLE %></h6>' +
                    '<p class="c-post-pod__intro"><% INTRO %></p>' +
                    
                    '<div class="c-post-pod__button-holder">' +
                        '<% TAGS %>' +

                        '<a class="c-button c-post-pod__button" href="https://blog.liamsnowdon.uk/posts/<% FILE %>" target="_blank">Go to post</a>' +
                    '</div>' +
                '</div>' +
            '</div>',

        tagsTemplate: '' +
            '<p class="fw-600">' +
                'Tags: ' +
                '<span class="fs-italic fw-700">' +
                    '<% TAGS %>' +
                '</span>' +
            '</p>',
        
        tagTemplate: '<a href="https://blog.liamsnowdon.uk/tags/<% FILE %>" target="_blank"><% NAME %></a>',

        initialise: function () {
            var self = this;

            this.recentPostsSectionEl = document.querySelector('.js-recent-posts-section');
            this.recentPostsPodsEl = document.querySelector('.js-recent-posts-pods');

            this.recentPosts = [];

            this.getPosts()
                .then(function () {
                    self.render();
                    self.applyScrollReveal();
                });
        },

        getPosts: function () {
            var self = this;

            return fetch('https://blog.liamsnowdon.uk/data/portfolio-recent-posts.json')
                .then(function(response) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }

                    return response.json()
                })
                .then(function(posts) {
                    self.recentPosts = posts;
                })
                .catch(function (error) {
                    console.error('There was a problem fetching recent blog posts.', error);
                });
        },

        render: function () {
            var self = this;

            if (!this.recentPosts || !this.recentPosts.length) {
                this.recentPostsSectionEl.style.display = 'none';
                return;
            }

            this.recentPosts.forEach(function (post) {
                var el = document.createElement('div');

                el.classList.add('l-grid__column', 'l-grid__column--12', 'l-grid__column--medium-6', 'l-grid__column--large-3');
                el.innerHTML = self.buildPodHtml(post);

                self.recentPostsPodsEl.appendChild(el);
            });        
        },

        buildPodHtml: function (post) {
            var self = this;        
            var tagsHtml = '';
            var html = this.postPodTemplate
                .replace('<% THUMBNAIL_IMAGE_URL %>', post.thumbnailImageUrl)
                .replace(/<% TITLE %>/g, post.title)
                .replace('<% DATE_POSTED %>', post.datePosted)
                .replace(/<% CATEGORY_FILE %>/g, post.category.file)
                .replace('<% CATEGORY_NAME %>', post.category.name)
                .replace('<% INTRO %>', post.intro)
                .replace(/<% FILE %>/g, post.file);

            if (post.tags.length) {
                html = html.replace('<% TAGS %>', this.tagsTemplate);
            } else {
                html = html.replace('<% TAGS %>', '');
            }

            post.tags.forEach(function (tag) {
                tagsHtml += self.tagTemplate
                    .replace('<% FILE %>', tag.file)
                    .replace('<% NAME %>', tag.name.toLowerCase());
            });

            html = html.replace('<% TAGS %>', tagsHtml);

            return html;
        },
        
        /**
         * @todo This breaks scroll reveal animation for profile for some reason. Commenting out for now
         */
        applyScrollReveal: function () {
            // ScrollReveal().reveal('.js-post-pod', { interval: 200 });
        }
    };
    
    Navigation.initialise();
    // RecentPosts.initialise();

    window.Portfolio = window.Portfolio || {};
    // window.Portfolio.RecentPosts = RecentPosts;
    window.Portfolio.Navigation = Navigation;
})();
