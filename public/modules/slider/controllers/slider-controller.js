'use strict';

angular.module('SliderModule')
	.controller('SliderController', function($scope, Slider) {
		Slider.all()
            .success(function (response) {
                $scope.images = response;
            })
	}
);
 