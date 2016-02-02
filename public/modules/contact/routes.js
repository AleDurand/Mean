'use strict';

angular.module('ContactModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/contact', {
                templateUrl: 'modules/contact/views/index.html',
                controller: 'ContactIndexController',
                controllerAs: 'indexController',
            })
    }]);
