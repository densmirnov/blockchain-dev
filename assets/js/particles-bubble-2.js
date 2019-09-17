(function($) {
	"use strict";

	// Bubble Background v2
	if($('#bubble-2-background').length){
		if(typeof particlesJS == 'undefined') {
			console.log('Bubble Background 2: particlesJS not Defined.');
			return true;
		}
		
		particlesJS("bubble-2-background", {
			"particles": {
				"number": {
					"value": 70,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#ffffff"
					},
					"polygon": {
						"nb_sides": 5
					}
				},
				"opacity": {
					"value": 1,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 0.1,
						"opacity_min": 0.3,
						"sync": false
					}
				},
				"size": {
					"value": 13,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 16.783216783216783,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": false,
					"distance": 220.96133965703635,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 1,
					"direction": "top",
					"random": true,
					"straight": true,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": false,
						"mode": "repulse"
					},
					"onclick": {
						"enable": false,
						"mode": "push"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 335.6643356643357,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 8,
						"speed": 3
					},
					"repulse": {
						"distance": 200,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		});
	
	}

})(jQuery);