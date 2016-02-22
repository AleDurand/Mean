'use strict';

angular.module('UsersModule')
    .factory('User', ['$http', function UserFactory($http) {
        return {
            all: function () {
                return $http({ method: 'GET', url: '/api/users' });
            },
            get: function (id) {
                return $http({ method: 'GET', url: '/api/users/' + id });
            },
            create: function (user) {
                return $http({ method: 'POST', url: '/api/users', data: user });
            },
            update: function (id, user) {
                return $http({ method: 'PUT', url: '/api/users/' + id, data: user });
            },
            delete: function (id) {
                return $http({ method: 'DELETE', url: '/api/users/' + id });
            },
            getByUsername: function (username) {
                return $http({ method: 'GET', url: '/api/users?username=' + username });
            },
        };
    }]);