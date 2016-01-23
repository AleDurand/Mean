angular.module('meanApp')
.controller('AlbumsShowController', function($scope, $http, $routeParams, Album) {
	Album.get($routeParams.id)
		.success(function(data) {
			$scope.album = data;
		});
	this.save = function(album, images){
		var fd = new FormData();
		fd.append('album', angular.toJson(album));
		for (var i = 0; i < images.length; i++) {
			fd.append('file' + i, images[i]._file);
		}
		$http.post('/api/albums/' + $routeParams.id + '/photos', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined }
		})
		.success(function(data){
		})
		.error(function(err){
		});
	};	
});