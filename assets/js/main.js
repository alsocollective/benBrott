var app = {
	init: function() {
		if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
			skrollr.init({
				forceHeight: false
			});
		}
		app.nav.init();
	},
	nav: {
		init: function() {
			$(window).scroll(app.nav.scrollFuc);
			app.nav.doc = document.documentElement;
			app.nav.el = $("#nav");
			$("#hamberger a").click(app.nav.hamClick);
			$("#navcontainer ul").click(app.nav.toggleOpen);
		},
		prev: 0,
		scrollFuc: function(event) {
			if (app.nav.prev < event.timeStamp - 10) {
				app.nav.prev = event.timeStamp;
				var top = (window.pageYOffset || app.nav.doc.scrollTop) - (app.nav.doc.clientTop || 0)
				if (top > 500) {
					app.nav.el.removeClass("intro");
					app.nav.el.addClass("hide");
				} else {
					app.nav.el.removeClass("show").removeClass("hide").addClass("intro")
				}
			}
		},
		hamClick: function(event) {
			if (app.nav.el.hasClass("show")) {
				app.nav.el.removeClass("show").addClass("hide");
				$(document.body).removeClass("noscroll")
			} else {
				app.nav.el.removeClass("hide").addClass("show");
				$(document.body).addClass("noscroll")
			}
			event.preventDefault();
			return false;
		},
		toggleOpen: function(event) {
			app.nav.el.removeClass("show").addClass("hide");
			$(document.body).removeClass("noscroll")
		}
	}
}