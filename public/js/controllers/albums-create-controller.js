angular.module('meanApp')
.controller('AlbumsCreateController', function($scope, $http) {
	var controller = this;
	 this.save = function(album, image){
        var fd = new FormData();
        fd.append('file', image);
        $http.post('/api/albums', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
        })
        .success(function(data){
        	alert(data);
        })
        .error(function(err){
        	alert(err);
        });
    };
});