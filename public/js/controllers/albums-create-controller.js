'use strict';

angular.module('meanApp')
.controller('AlbumsCreateController', function($scope, Album) {
	$scope.success = null;
	$scope.error = null;
	this.save = function(album){
		Album.create(album)
			.success(function(response) {
				$scope.success = true;
				$scope.albums = response;
			})
			.error(function(response) {
				$scope.error = response.message;
			});
	};
});