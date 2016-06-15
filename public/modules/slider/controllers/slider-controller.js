'use strict';

angular.module('SliderModule')
	.controller('SliderController', function ($scope, $rootScope, Slider) {
		Slider.all()
            .success(function (response) {
                $scope.images = response;
            })
	}
);
 