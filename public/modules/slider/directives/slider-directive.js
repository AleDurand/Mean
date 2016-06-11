'use strict';

angular.module('SliderModule')
	.directive('slider', function ($timeout) {
	  return {
	    restrict: 'E',
		scope:{
			images: '='
		},
		controller: "SliderController",
	    link: function (scope, elem, attrs) {
    		$('#layerslider').layerSlider({
				skinsPath : 'libraries/layerslider/skins/',
				skin : 'fullwidthdark',
				thumbnailNavigation : 'enabled',
				showCircleTimer : false,
				showBarTimer : false,
	    		touchNav : true,
				navStartStop : true,
				navButtons : true,
				animateFirstLayer : true,
				responsive : true
			});
	    },
		templateUrl:'modules/slider/views/index.html'
	  }
	}
);