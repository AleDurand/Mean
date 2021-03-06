'use strict';

angular.module('meanApp')
    .factory('TokenInterceptor',['$q', '$window', 'Authentication', function ($q, $window, Authentication) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
                }
                return config;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !Authentication.isAuthenticated) {
                    Authentication.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || Authentication.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    Authentication.isAuthenticated = false;
                }

                return $q.reject(rejection);
            }
        };
    }]);

angular.module('meanApp').config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);
