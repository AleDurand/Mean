'use strict';

angular.module('ContactModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/contact', {
                controller: 'ContactIndexController',
                controllerAs: 'indexController',
                templateUrl: 'modules/contact/views/index.html',
            })
    }]);