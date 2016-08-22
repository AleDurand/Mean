'use strict';

angular.module('ContactModule')
    .factory('Contact', ['$http', function ContactFactory($http) {
        return {
            sendEmail: function (email) {
                return $http({ method: 'POST', url: '/api/contact/send-email', data: email });
            },
            get: function () {
                return $http({ method: 'GET', url: '/api/contact'});
            },
            update: function (contact) {
                return $http({ method: 'PUT', url: '/api/contact', data:contact });
            }
        };
    }]);