'use strict';

angular.module('SliderModule')
    .factory('Slider', ['$http', function SliderFactory($http) {
        return {
            all: function () {
                return $http({ method: 'GET', url: '/api/covers' });
            },
         	update: function (cover_id, data) {
                return $http({
                    method: 'PUT',
                    url: '/api/covers/' + cover_id,
                    data: data,
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'X-Frame-Options':false }
                });
            },        
        };
    }]);