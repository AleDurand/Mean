angular.module('meanApp')
.factory('Album', ['$http', function AlbumFactory($http) {
    return {
        all : function() {
            return $http.get('/api/albums');
        },
        get : function(id) {
            return $http.get('/api/albums/' + id);
        },
        create : function(album) {
            return $http.post('/api/albums', album);
        },
        delete : function(id) {
            return $http.delete('/api/albums/' + id);
        }
    };
}]);