angular.module('meanApp')
.controller('AlbumsShowController', function($scope, $routeParams, Album) {
	Album.get($routeParams.id)
		.success(function(data) {
			$scope.album = data;
		});
});