angular.module('meanApp')
.controller('AlbumsCreateController', function($scope, Album) {
	this.save = function(album){
		Album.create(album)
			.success(function(data) {
				$scope.albums = data;
			});
	};
});