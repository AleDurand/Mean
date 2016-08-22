'use strict';

angular.module('meanApp')
    .factory('Authentication', function () {
        var auth = {
            user: false
        }
        return auth;
    });