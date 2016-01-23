angular.module('meanApp')
.controller('AlbumsCreateController', function($scope, $http) {
	$scope.album = {
		name: "",
		description: ""
	};
	this.save = function(album, images){
		var fd = new FormData();
		fd.append('album', angular.toJson(album));
		for (var i = 0; i < images.length; i++) {
			fd.append('file' + i, images[i]._file);
		}
		$http.post('/api/albums', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined }
		})
		.success(function(data){
		})
		.error(function(err){
		});
	};
});