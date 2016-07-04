'use strict';

angular.module('AlbumsModule')
    .factory('Album', ['$http', function AlbumFactory($http) {
        return {
            all: function () {
                return $http({ method: 'GET', url: '/api/albums' });
            },
            get: function (name) {
                return $http({ method: 'GET', url: '/api/albums/' + name });
            },
            create: function (album) {
                return $http({ method: 'POST', url: '/api/albums', data: album });
            },
            update: function (name, album) {
                return $http({ method: 'PUT', url: '/api/albums/' + name, data: album });
            },
            delete: function (name) {
                return $http({ method: 'DELETE', url: '/api/albums/' + name });
            },
            addPhotos: function (album_id, data) {
                return $http({
                    method: 'POST',
                    url: '/api/albums/' + album_id + '/photos',
                    data: data,
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'X-Frame-Options':false }
                });
            },
            deletePhoto: function (album_id, photo_id) {
                return $http({ method: 'DELETE', url: '/api/albums/' + album_id + '/photos/' + photo_id });
            }
        };
    }]);