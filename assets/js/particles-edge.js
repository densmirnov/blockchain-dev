(function($) {
	"use strict";

	// Edge Background
	if($('#edge-background').length){
		if(typeof particlesJS == 'undefined') {
			console.log('Edge Background: particlesJS not Defined.');
			return true;
		}
		
		particlesJS("edge-background", {
			"particles": {
				"number": {
					"value": 10,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "edge",
					"stroke": {
						"width": 0,
						"color": "#000"
					}
				},
				"opacity": {
					"value": 0.5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 170,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 10,
						"size_min": 40,
						"sync": false
					}
				},
				"line_linked": {
					"enable": false
				},
				"move": {
					"enable": true,
					"speed": 5,
					"direction": "none",
					"random": true,
					"straight": false,
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
						"mode": "grab"
					},
					"onclick": {
						"enable": false,
						"mode": "push"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
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