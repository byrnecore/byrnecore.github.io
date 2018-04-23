// Swiper

var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Smooth Scroll to anchors

var scroll = new SmoothScroll('a[href*="#"]');


// GA tagging and tracing

<!-- Global site tag (gtag.js) - Google Analytics -->
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-117998943-1');	