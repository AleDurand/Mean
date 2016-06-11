'use strict';

angular.module('SliderModule')
	.controller('SliderController', function($scope) {
		$scope.images =
		[
			{src:'resources/covers/slide1.jpg',title:'Pic 1'},
			{src:'resources/covers/slide2.jpg',title:'Pic 2'},
			{src:'resources/covers/slide3.jpg',title:'Pic 3'}
		]; 
	}
);
 