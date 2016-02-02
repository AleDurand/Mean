'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsCreateController', function ($scope, $location, Album, Authentication) {
        $scope.user = Authentication.user;

        $scope.success = null;
        $scope.error = null;
        this.save = function (album) {
            Album.create(album)
                .success(function (response) {
                    $scope.success = true;
                    $scope.albums = response;
                    $location.path('/');
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };
    });