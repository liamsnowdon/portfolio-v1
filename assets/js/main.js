window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),function(){for(var a=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-a)),i=window.setTimeout(function(){e(n+o)},o);return a=n+o,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),function(e,t){"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(S){"use strict";function E(){for(var n={},e=0;e<arguments.length;e++)!function(e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])}(arguments[e]);return n}function c(t){var n;try{n=decodeURIComponent(t)}catch(e){n=t}return n}function l(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n,o=String(e),i=o.length,a=-1,r="",s=o.charCodeAt(0);++a<i;){if(0===(t=o.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===s?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?o.charAt(a):"\\"+o.charAt(a)}try{n=decodeURIComponent("#"+r)}catch(e){n="#"+r}return n}function b(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function L(e){return e?(t=e,parseInt(S.getComputedStyle(t).height,10)+e.offsetTop):0;var t}function A(e,t,n,o){t.emitEvents&&"function"==typeof S.CustomEvent&&(o=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}}),document.dispatchEvent(o))}var O={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0};return function(o,e){var g,i,n,p,t,y,w={cancelScroll:function(e){cancelAnimationFrame(y),y=null,e||A("scrollCancel",g)}};w.animateScroll=function(o,i,e){var a,r,s,c,l,u,d,m,f,h=E(g||O,e||{}),v="[object Number]"===Object.prototype.toString.call(o),t=v||!o.tagName?null:o;(v||t)&&(a=S.pageYOffset,h.header&&!n&&(n=document.querySelector(h.header)),p=p||L(n),r=v?o:function(e,t,n,o){var i=0;if(e.offsetParent)for(;i+=e.offsetTop,e=e.offsetParent,e;);return i=Math.max(i-t-n,0),o&&(i=Math.min(i,b()-S.innerHeight)),i}(t,p,parseInt("function"==typeof h.offset?h.offset(o,i):h.offset,10),h.clip),s=r-a,c=b(),m=function(e,t){var n=S.pageYOffset;if(e==t||n==t||(a<t&&S.innerHeight+n)>=c)return w.cancelScroll(!0),e=t,n=v,0===(t=o)&&document.body.focus(),n||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),S.scrollTo(0,e)),A("scrollStop",h,o,i),!(y=u=null)},f=function(e){var t,n,o;d=(l+=e-(u=u||e))/parseInt(h.speed,10),d=a+s*(n=d=1<d?1:d,"easeInQuad"===(t=h).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),S.scrollTo(0,Math.floor(d)),m(d,r)||(y=S.requestAnimationFrame(f),u=e)},(l=0)===S.pageYOffset&&S.scrollTo(0,0),e=o,t=h,v||history.pushState&&t.updateURL&&history.pushState({smoothScroll:JSON.stringify(t),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id),A("scrollStart",h,o,i),w.cancelScroll(!0),S.requestAnimationFrame(f))};function a(e){var t,n;"matchMedia"in S&&S.matchMedia("(prefers-reduced-motion)").matches||0!==e.button||e.metaKey||e.ctrlKey||"closest"in e.target&&(i=e.target.closest(o))&&"a"===i.tagName.toLowerCase()&&!e.target.closest(g.ignore)&&i.hostname===S.location.hostname&&i.pathname===S.location.pathname&&/#/.test(i.href)&&(t=l(c(i.hash)),(n=(n=g.topOnEmptyHash&&"#"===t?document.documentElement:document.querySelector(t))||"#top"!==t?n:document.documentElement)&&(e.preventDefault(),w.animateScroll(n,i)))}function r(e){var t;null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(g)&&(!history.state.anchor||(t=document.querySelector(l(c(history.state.anchor))))&&w.animateScroll(t,null,{updateURL:!1}))}function s(e){t=t||setTimeout(function(){t=null,p=L(n)},66)}return w.destroy=function(){g&&(document.removeEventListener("click",a,!1),S.removeEventListener("resize",s,!1),S.removeEventListener("popstate",r,!1),w.cancelScroll(),y=t=p=n=i=g=null)},w.init=function(e){if(!("querySelector"in document&&"addEventListener"in S&&"requestAnimationFrame"in S&&"closest"in S.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";w.destroy(),g=E(O,e||{}),n=g.header?document.querySelector(g.header):null,p=L(n),document.addEventListener("click",a,!1),n&&S.addEventListener("resize",s,!1),g.updateURL&&g.popstate&&S.addEventListener("popstate",r,!1)},w.init(e),w}}),ScrollReveal({duration:1200,delay:100,viewOffset:{top:60}}),ScrollReveal().reveal(".js-profile-text",{interval:200,distance:"100px",origin:"right"}),ScrollReveal().reveal(".js-profile-icon",{delay:400,interval:200,distance:"50px",origin:"bottom"}),ScrollReveal().reveal(".js-profile-picture",{delay:600,distance:"50px",origin:"bottom"}),ScrollReveal().reveal(".js-skill",{interval:200,distance:"50px",origin:"top"}),ScrollReveal().reveal(".js-project-left",{delay:400,distance:"200px",origin:"left"}),ScrollReveal().reveal(".js-project-right",{delay:400,distance:"200px",origin:"right"}),{initialise:function(){this.scroll=new SmoothScroll('a[href*="#"]',{header:".js-navigation"}),this.pageOverlay=document.querySelector(".js-page-overlay"),this.navigationMenu=document.querySelector(".js-navigation-menu"),this.navigationLinks=document.querySelector(".js-navigation-links"),this.navigationItems=document.querySelectorAll(".js-navigation-item"),this.connectEvents()},connectEvents:function(){var t=this;this.navigationMenu.addEventListener("click",this.toggleNavigation.bind(this)),this.navigationItems.forEach(function(e){e.addEventListener("click",t.closeNavigation.bind(t))}),window.addEventListener("resize",function(){768<=window.innerWidth&&t.closeNavigation()})},toggleNavigation:function(){this.navigationMenu.classList.toggle("is-active"),this.navigationLinks.classList.toggle("is-active"),this.pageOverlay.classList.toggle("is-active")},closeNavigation:function(){this.navigationMenu.classList.remove("is-active"),this.navigationLinks.classList.remove("is-active"),this.pageOverlay.classList.remove("is-active")}}.initialise();