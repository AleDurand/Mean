'use strict';

angular.module('SliderModule')
	.controller('SliderController', ['$scope', '$rootScope', 'Slider', function ($scope, $rootScope, Slider) {
		$('#layerslider').layerSlider('start'); 
        $('slider').show();
    
		Slider.all()
            .success(function (response) {
                $scope.images = response;
            })
	}
    ]);
 