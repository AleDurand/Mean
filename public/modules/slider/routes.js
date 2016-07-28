'use strict';

angular.module('SliderModule', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/covers/edit', {
                controller: 'SliderEditController',
                controllerAs: 'editController',
                templateUrl: 'modules/slider/views/edit.html'
            })
    }]);
    