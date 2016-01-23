angular.module('meanApp')
.controller('AlbumsIndexController', function($scope, Album) {
	Album.all()
		.success(function(data) {
			$scope.albums = data;
});