'use strict';

angular.module('SliderModule', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/covers/edit', {
                templateUrl: 'modules/slider/views/edit.html',
                controller: 'SliderEditController',
                controllerAs: 'editController'
            })
            .otherwise({ redirectTo: '/albums' });
    }]);