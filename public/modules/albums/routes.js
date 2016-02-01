'use strict';

angular.module('AlbumsModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/albums', {
                templateUrl: 'modules/albums/views/index.html',
                controller: 'AlbumsIndexController',
                controllerAs: 'indexController',
            })
            .when('/albums/create', {
                templateUrl: 'modules/albums/views/create.html',
                controller: 'AlbumsCreateController',
                controllerAs: 'createController'
            })
            .when('/albums/:id', {
                templateUrl: 'modules/albums/views/show.html',
                controller: 'AlbumsShowController',
                controllerAs: 'showController'
            })
            .otherwise({ redirectTo: '/albums' });
    }]);
