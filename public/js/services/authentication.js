angular.module('meanApp')
    .factory('Authentication', function () {
        var auth = {
            isLogged: false
        }

        return auth;
    });