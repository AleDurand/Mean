'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsIndexController', function ($scope, $route, Album, Authentication) {
        $scope.user = Authentication.user;

        Album.all()
            .success(function (response) {
                $scope.success = true;
                $scope.albums = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
        this.delete = function (album) {
            Album.delete(album._id)
                .success(function (response) {
                    $scope.success = true;
                    $scope.album = response;
                    $route.reload();
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };
    });