/*
Theme Name: Lana
Description: Creative Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/lana/
Author URI: https://themeforest.net/user/erilisdesign
Version: 1.3.0
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------------------
[Table of contents]

1. Preloader
2. Animations
3. Backgrounds
4. Fullpage
5. Set Section Scheme
6. Scroll progress
7. Navigation
8. Back to top
9. Magnific Popup
10. Slider
11. Countdown
12. Mailchimp
13. Contact Form
14. Sticky Header
-------------------------------------------------------------------*/

(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$ln_fullPage = $('.ln-fullpage'),
		$siteHeader = $('.site-header'),
		$nav = $('#navigation'),
		$navToggle = $('#navigation-toggle'),
		$backtotop = $('a.backtotop'),
		$preloader = $('#preloader'),
		preloaderDelay = 1200,
		preloaderFadeOutTime = 500,
		animationsRepeat = true, // true, false - Only when you use Fullpage.js
		target,
		trueMobile;

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}
	
	// System Detector
	function ln_systemDetector() {

		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
			}
		};

		trueMobile = isMobile.any();

	}

	function ln_screenDetector() {
		if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
			$body.removeClass('layout-mobile');
		} else {
			$body.addClass('layout-mobile');
		}
	}

	// [1. Preloader]
	function ln_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}

	// [2. Animations]
	function ln_animations() {

		$('.animated').each(function() {
			var $element = $(this);
			new Waypoint({
				element: $element,
				handler: function(direction) {
					var $element = this.element,
						animation = $element.attr('data-animation'),
						animationDelay = parseInt($element.attr('data-animation-delay'), 10);
					if ( !$element.hasClass('visible') ) {
						if ( animationDelay ) {
							setTimeout(function(){
								$element.addClass(animation + ' visible');
							}, animationDelay);
						} else {
							$element.addClass(animation + ' visible');
						}
					}
					this.destroy();
				},
				offset: '100%'
			});
		});

	}

	// [3. Backgrounds]
	function ln_backgrounds() {

		// Image
		var $bgImage = $('.bg-image-holder');
		if($bgImage.length) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');
				var $self = $(this);

				$self.css('background-image','url('+src+')').children('img').hide();

				$self.imagesLoaded({
					background: true
				}, function(instance, image) {
					$self.addClass('loaded');
				});
			});
		}

		// Global overlay animation - Add a background color and a opacity to the overlays in the sections that has use a animated backgrounds on scroll
		if($('.global-overlay').length > 0){
			$('.ln-section').each(function(){
				var element = $(this),
					sectionOverlayOpacity = parseInt(element.attr('data-overlay-opacity'), 10),
					sectionOverlayColor = element.attr('data-overlay-color');

				if(sectionOverlayColor){
					element.find('.overlay.has-mobile-overlay .overlay-inner').css('background-color', sectionOverlayColor);
				}
				if(sectionOverlayOpacity){
					element.find('.overlay.has-mobile-overlay .overlay-inner').css('opacity', sectionOverlayOpacity/100);
				}
			});
		}

		// Slideshow
		if ($body.hasClass('slideshow-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-4.jpg' }
				]
			});
		}

		// Slideshow - ZoomOut
		if ($body.hasClass('slideshow-zoom-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 7000,
				transition: 'zoomOut',
				transitionDuration: 4000,
				slides: [
					{ src: 'demo/images/image-4.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-15.jpg' }
				]
			});
		}

		// Slideshow with Video
		if ($body.hasClass('slideshow-video-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' }
				]
			});
		}

		// Kenburns
		if ($body.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-15.jpg', valign: 'top' },
				{ src: 'demo/images/image-14.jpg', valign: 'top' },
				{ src: 'demo/images/image-17.jpg', valign: 'top' }
			];

			$body.vegas({
				preload: true,
				transition: 'swirlLeft2',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation = 'kenburns';
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$body
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}

		// Youtube Video
		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}

		// Youtube Multiple Videos
		if ($('#youtube-multiple-background').length > 0) {

			var videos = [
				{videoURL: "CG20eBusRg0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);

		}

		// Video Background
		if($body.hasClass('mobile')) {
			$('.video-wrapper').css('display', 'none');
		}

		// Granim
		$('[data-gradient-bg]').each(function(index,element){
    		var granimParent = $(this),
    			granimID = 'granim-'+index+'',
				colours = granimParent.attr('data-gradient-bg'),
				colours = colours.replace(' ',''),
				colours = colours.replace(/'/g, '"')
				colours = JSON.parse( colours );

			// Add canvas
			granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

			var granimInstance = new Granim({
				element: '#'+granimID,
				name: 'basic-gradient',
				direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				states : {
					"default-state": {
						gradients: colours
					}
				}
			});
    	});

	}

	// [4. Fullpage]
	function ln_fullpage() {
		if( $ln_fullPage.length > 0 ){

			// Generate anchors
			var anchors = [];
			$ln_fullPage.children('section').each(function() {
				var anchor = $(this).data('anchor');
				if(typeof anchor !== 'undefined') {
					anchors.push(anchor);
				}
			});

			Waypoint.destroyAll();

			if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
				if( !$ln_fullPage.hasClass('fullpage-wrapper') || $ln_fullPage.hasClass('fp-destroyed') ){

					$('.ln-section').each(function(){
						var section = $(this),
							sectionHeight = parseInt(section.innerHeight(),10);

						if( sectionHeight > getWindowHeight() ){
							section.addClass('is-scrollable');
						}
					});

					$body.addClass('ln-fullpage-active');

					$ln_fullPage.fullpage({
						//Navigation
						menu: '#navigation',
						lockAnchors: false,
						anchors: anchors,

						//Scrolling
						scrollingSpeed: 700,
						autoScrolling: true,
						fitToSection: true,
						fitToSectionDelay: 700,
						scrollBar: false,
						easingcss3: 'cubic-bezier(0.54, 0.18, 0.36, 0.81)',
						loopBottom: false,
						loopTop: false,
						scrollOverflow: true,

						//Accessibility
						animateAnchor: true,
						recordHistory: false,

						//Design
						controlArrows: false,
						verticalCentered: false,
						paddingTop: false,
						paddingBottom: false,

						//Custom selectors
						sectionSelector: '.ln-section',
						slideSelector: '.ln-slide',

						// Events
						onLeave: function(index, nextIndex, direction){
							if(nextIndex === 1){
								$body.addClass('ln-fullpage-intro-active');
								$backtotop.removeClass('active');
							} else {
								$body.removeClass('ln-fullpage-intro-active');
								$backtotop.addClass('active');
							}

							// Global overlay animation - background color and opacity
							var sectionOverlayColor = $('.ln-section').eq( nextIndex - 1 ).attr('data-overlay-color'),
								sectionOverlayOpacity = parseInt($('.ln-section').eq( nextIndex - 1 ).attr('data-overlay-opacity'), 10);

							if(sectionOverlayColor){
								$('.global-overlay-color').css('background-color', sectionOverlayColor);
							}
							if(sectionOverlayOpacity){
								$('.global-overlay-color').css('opacity', sectionOverlayOpacity/100);
							}
							
							// Set Section Scheme
							var uiColor = $('.ln-section').eq( nextIndex - 1 ).attr('data-ui');
							ln_setSectionScheme(uiColor);

							// Scroll progress
							ln_scrollProgress(nextIndex);
						},
						afterLoad: function(anchorLink, index){
							if(index == 1){
								$body.addClass('ln-fullpage-intro-active');
								$backtotop.removeClass('active');
							} else {
								$backtotop.addClass('active');
							}

							$('.animated').each(function(){
								var element = $(this),
									animation = element.attr('data-animation') || 'fadeInUp',
									animationDelay = parseInt(element.attr('data-animation-delay'), 10) || 0;

								if ( element.parents('.ln-section').hasClass('active') ) {
									if ( !element.hasClass('visible') ) {
										if ( animationDelay ) {
											setTimeout(function(){
												element.addClass(animation + ' visible');
											}, animationDelay);
										} else {
											element.addClass(animation + ' visible');
										}
									}
								} else {
									if(animationsRepeat = true){
										element.removeClass( animation + ' visible' );
									}
								}
							});

						},
						afterRender: function(){
							// Global overlay animation - background color and opacity
							var sectionOverlayColor = $('.ln-section').eq( 0 ).attr('data-overlay-color'),
								sectionOverlayOpacity = parseInt($('.ln-section').eq( 0 ).attr('data-overlay-opacity'), 10);

							if(sectionOverlayColor){
								$('.global-overlay-color').css('background-color', sectionOverlayColor);
							}
							if(sectionOverlayOpacity){
								$('.global-overlay-color').css('opacity', sectionOverlayOpacity/100);
							}

							// Set Section Scheme
							var uiColor = $('.ln-section').eq( 0 ).attr('data-ui');
							ln_setSectionScheme(uiColor);
						}
					});
				}
			} else {
				// Fullpage - Destroy
				if( $ln_fullPage.hasClass('fullpage-wrapper') && !$ln_fullPage.hasClass('fp-destroyed') ){
					$body.removeClass('ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark');
					$.fn.fullpage.destroy('all');
					$('.ln-section').removeClass('is-scrollable');
				}
				ln_animations();
				ln_sectionScheme();
			}
		} else {
			$body.removeClass('ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark');
			$('.ln-section').removeClass('is-scrollable');
			ln_animations();
			ln_sectionScheme();
		}
	}

	// [5. Set Section Scheme]
	function ln_setSectionScheme(uiColor) {
		if( uiColor === 'light' ){
			$body.removeClass('ui-dark').addClass('ui-light');
		} else if( uiColor === 'dark' ){
			$body.removeClass('ui-light').addClass('ui-dark');
		} else {
			$body.removeClass('ui-dark ui-light');
		}
	}

	function ln_sectionScheme() {
		if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
			if( $ln_fullPage.length === 0 || !$ln_fullPage.hasClass('fullpage-wrapper') || $ln_fullPage.hasClass('fp-destroyed') ){
				$('section').each(function(){
					var section = $(this);

					var waypoints = section.waypoint(function(direction) {
						var uiColor = section.attr('data-ui');

						if (direction === 'down') {
							ln_setSectionScheme(uiColor);
						}

					},{
						offset: '50%',
					});

					var waypoints = section.waypoint(function(direction) {
						var uiColor = section.attr('data-ui');

						if (direction === 'up') {
							ln_setSectionScheme(uiColor);
						}

					},{
						offset: '-50%',
					});

				});
			}
		}
	}

	// [6. Scroll progress]
	function ln_scrollProgress(nextIndex) {
		if( getWindowWidth() >= 1200 ){
			if( nextIndex === 'none' && !$body.hasClass('ln-fullpage-active') ){
				var scvp = $(window).scrollTop();
			} else {
				var scvp = getWindowHeight() * (nextIndex - 1);
			}

			var dh = $(document).height(),
				dp = $(window).height(),
				scrollPercent = (scvp / (dh-dp)) * 100,
				position = scrollPercent;
			$('.scroll-progress .progress').css('height', position + '%');
		}
	}

	// [7. Navigation]
	function ln_navigation() {
		var smoothScrollLinks = $('a.scrollto, .site-header a[href^="#"]');

		// Mobile navigation
		$navToggle.off('click');
		if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
			$navToggle.removeClass('open');
			$('.header-collapse').css('display', '');
		}

		$navToggle.on('click', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('open')){
				$(this).addClass('open');
				$('.header-collapse').slideDown(500);
			} else {
				$('.header-collapse').slideUp(500);
				$(this).removeClass('open');
			}
		});

		// Smooth Scroll
		smoothScrollLinks.off('click');
		smoothScrollLinks.on('click', function(e) {
			e.preventDefault();
			var target = $(this).attr('href');

			if( $body.hasClass('ln-fullpage-active') ){
				var target = target.substr(1);

				$.fn.fullpage.moveTo(target);
			} else {
				if( $(this).parents('li').attr('data-menuanchor') ){
					var target = $('[data-anchor="'+ target.substr(1) +'"]');

					$.smoothScroll({
						offset: 0,
						easing: 'swing',
						speed: 800,
						scrollTarget: target,
						preventDefault: false
					});
				} else {
					if( $body.find('[data-anchor="'+ target.substr(1) +'"]') ){
						var target = $('[data-anchor="'+ target.substr(1) +'"]');

						$.smoothScroll({
							offset: 0,
							easing: 'swing',
							speed: 800,
							scrollTarget: target,
							preventDefault: false
						});
					} else {
						$.smoothScroll({
							offset: 0,
							easing: 'swing',
							speed: 800,
							scrollTarget: target,
							preventDefault: false
						});
					}
				}
			}
			
			if( $(this).parents('.site-header').hasClass('header-mobile-sticky') ){
				if( 1199 > getWindowWidth() || 767 > getWindowHeight() ){
					$navToggle.removeClass('open');
					$('.header-collapse').css('display', '');
				}
			}
		});
	}

	// [8. Back to top]
	function ln_backToTop() {
		var scrollpos = $(window).scrollTop();

		if( !$body.hasClass('ln-fullpage-active') ){
			if( getWindowWidth() >= 576 ){
				if ( scrollpos > 100 ) {
					$backtotop.addClass('active');
				} else {
					$backtotop.removeClass('active');
				}
			} else {
				$backtotop.removeClass('active');
			}
		}

		$backtotop.off('click');
		$backtotop.on('click', function(e) {
			e.preventDefault();

			if($body.hasClass('ln-fullpage-active')){
				$.fn.fullpage.moveTo(1);
			} else {
				var target = $(this).attr('href');

				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: target,
					preventDefault: false
				});
			}
		});
	}
	
	// [9. Magnific Popup]
	function ln_magnificPopup() {
		if(	document.querySelectorAll('.mfp-image').length > 0 ||
			document.querySelectorAll('.mfp-gallery').length > 0 ||
			document.querySelectorAll('.mfp-iframe').length > 0 ||
			document.querySelectorAll('.mfp-ajax').length > 0 ||
			document.querySelectorAll('.open-popup-link').length > 0 ){

			if(!$().magnificPopup) {
				console.log('MagnificPopup: magnificPopup not defined.');
				return true;
			}

			$('.mfp-image').magnificPopup({
				type:'image',
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});

			$('.mfp-gallery').each(function() {
				$(this).magnificPopup({
					delegate: 'a',
					type: 'image',
					gallery: {
						enabled: true
					},
					arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
					closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
					removalDelay: 300,
					mainClass: 'mfp-fade'
				});
			});

			$('.mfp-iframe').magnificPopup({
				type: 'iframe',
				iframe: {
					patterns: {
						youtube: {
							index: 'youtube.com/',
							id: 'v=',
							src: '//www.youtube.com/embed/%id%?autoplay=1'
						},
						vimeo: {
							index: 'vimeo.com/',
							id: '/',
							src: '//player.vimeo.com/video/%id%?autoplay=1'
						},
						gmaps: {
							index: '//maps.google.',
							src: '%id%&output=embed'
						}
					},
					srcAction: 'iframe_src'
				},
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});

			$('.mfp-ajax').magnificPopup({
				type: 'ajax',
				ajax: {
					settings: null,
					cursor: 'mfp-ajax-cur',
					tError: '<a href="%url%">The content</a> could not be loaded.'
				},
				midClick: true,
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				callbacks: {
					ajaxContentAdded: function(mfpResponse) {
						ln_Slider();
					}
				}
			});

			$('.open-popup-link').magnificPopup({
				type: 'inline',
				midClick: true,
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-zoom-in'
			});

			$('.popup-modal-dismiss').on('click', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
			});

		}
	}

	// [10. Slider]
	function ln_slider() {
		var slider = $('.slider');
		if(slider.length > 0){
			if( getWindowWidth() >= 992 && getWindowHeight() >= 768 ){
				if( !slider.hasClass('slick-initialized') ){
					slider.slick({
						slidesToShow: 1,
						infinite: true,
						nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
						prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>'
					});
				}
			} else {
				if( slider.hasClass('slick-initialized') ){
					slider.slick('unslick');
				}
			}
		}
	}

	// [11. Countdown]
	function ln_countdown() {
		var countdown = $('.countdown[data-countdown]');

		if (countdown.length > 0) {
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="countdown-container row"><div class="countdown-item col-6 col-sm-3"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm-3"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm-3"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm-3"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}
	}

	// [12. Mailchimp]
	function ln_mailchimp() {
		var subscribeForm = $('.subscribe-form');
		if( subscribeForm.length < 1 ){ return true; }

		subscribeForm.each( function(){
			var el = $(this),
				elResult = el.find('.subscribe-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						resetForm: true,
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// [13. Contact Form]
	function ln_contactForm() {
		var contactForm = $('.contact-form');
		if( contactForm.length < 1 ){ return true; }

		contactForm.each( function(){
			var el = $(this),
				elResult = el.find('.contact-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// [14. Sticky Header]
	function ln_stickyHeader() {
		if( $siteHeader.hasClass('header-mobile-sticky') ){
			$body.find('section').first().css('padding-top','');
			if( 1199 >= getWindowWidth() ){
				var siteHeaderHeight = parseInt($siteHeader.innerHeight(),10),
					firstSectionPaddingTop = parseInt($body.find('section').first().css('padding-top'),10);

				$body.find('section').first().css('padding-top', siteHeaderHeight + firstSectionPaddingTop);
			} else {
				$body.find('section').first().css('padding-top','');
			}
		}
	}

	// window load function
	$(window).on('load', function() {
		$(window).scroll();
		ln_preloader();
	});

	// document.ready function
	jQuery(document).ready(function($) {
		$('html, body').scrollTop(0);
		ln_screenDetector();
		ln_backgrounds();
		ln_stickyHeader();
		ln_slider();
		ln_fullpage();
		ln_navigation();
		ln_magnificPopup();
		ln_countdown();
		ln_mailchimp();
		ln_contactForm();
	});

	// window.resize function
	$(window).on('resize', function() {
		ln_screenDetector();
		ln_stickyHeader();
		ln_slider();
		ln_fullpage();
		ln_navigation();
		ln_scrollProgress('none');
		ln_backToTop();
	});

	// window.scroll function
	$(window).on('scroll', function() {
		ln_scrollProgress('none');
		ln_backToTop();
	});

})(jQuery);