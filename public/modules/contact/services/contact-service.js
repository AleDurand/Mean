'use strict';

angular.module('ContactModule')
    .factory('Contact', ['$http', function ContactFactory($http) {
        return {
            sendEmail: function (email) {
                return $http({ method: 'POST', url: '/api/contact/send-email', data: email });
            }
        };
    }]);