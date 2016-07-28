'use strict';

angular.module('AlbumsModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/albums', {
                templateUrl: 'modules/albums/views/index.html',
                controller: 'AlbumsIndexController',
                controllerAs: 'indexController',
            })
            .when('/albums/15', {
                templateUrl: 'modules/albums/views/index.html',
                controller: 'AlbumsIndexController',
                controllerAs: 'indexController',
            })
            .when('/albums/bodas', {
                templateUrl: 'modules/albums/views/index.html',
                controller: 'AlbumsIndexController',
                controllerAs: 'indexController',
            })
            .when('/albums/otros-eventos', {
                templateUrl: 'modules/albums/views/index.html',
                controller: 'AlbumsIndexController',
                controllerAs: 'indexController',
            })
            .when('/albums/create', {
                templateUrl: 'modules/albums/views/create.html',
                controller: 'AlbumsCreateController',
                controllerAs: 'createController'
            })
            .when('/albums/:name', {
                templateUrl: 'modules/albums/views/show.html',
                controller: 'AlbumsShowController',
                controllerAs: 'showController'
            })
    }]);
