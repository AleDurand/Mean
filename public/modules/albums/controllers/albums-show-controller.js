'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsShowController', function ($scope, $route, $http, $routeParams, Album, Authentication) {
        $scope.user = Authentication.isLogged;

        Album.get($routeParams.id)
            .success(function (response) {
                $scope.success = true;
                $scope.album = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
        this.save = function (album, images) {
            var fd = new FormData();
            fd.append('album', angular.toJson(album));
            for (var i = 0; i < images.length; i++) {
                fd.append('file' + i, images[i]._file);
            }
            $http.post('/api/albums/' + $routeParams.id + '/photos', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (response) {
                    $scope.success = true;
                    $scope.album = response;
                    $route.reload();
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };
        this.selected = function (photo, album) {
            album.imageAlbum = photo._id;
            Album.update(album._id, album);
        };
    });