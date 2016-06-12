'use strict';

angular.module('SliderModule')
    .factory('Slider', ['$http', function SliderFactory($http) {
        return {
            all: function () {
                return $http({ method: 'GET', url: '/api/covers' });
            }
        };
    }]);