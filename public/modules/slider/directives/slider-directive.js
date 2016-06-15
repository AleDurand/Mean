'use strict';

angular.module('SliderModule')
	.directive('slider', function ($timeout, $rootScope) {
	  return {
	    restrict: 'E',
		controller: "SliderController",
	    link: function (scope, elem, attrs) {
    		$('#layerslider').layerSlider({
				skinsPath : 'libraries/layerslider/skins/',
				skin : 'fullwidthdark',
				thumbnailNavigation : 'enabled',
				showCircleTimer : true,
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