
// Smooth Scroll to anchors

var scroll = new SmoothScroll('a[href*="#"]');


// ScrollReveal

ScrollReveal().reveal('.reveal', { duration: 2000 }, { delay: 1500 });
ScrollReveal().reveal('.heroreveal', { duration: 3000 });


// Burger Toggle

var $hamburger = $(".hamburger");
	$hamburger.on("click", function(e) {
	$hamburger.toggleClass("is-active");
	// Do something else, like open/close menu
});

$('#burger_btn').click(function(e){
	e.preventDefault();
	$('#mainNav').toggleClass('menuOpen');
});