'use strict'

angular.module('meanApp')
    .controller('UserLoginController', function ($scope, $window, Authentication) {
               
        //Admin User Controller (login, logout)
        $scope.login = function (username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.localStorage.token = authdata;
                Authentication.isLogged = true;
            }
        }

        $scope.logout = function () {
            if (Authentication.isLogged) {
                Authentication.isLogged = false;
                delete $window.localStorage.token;
            }
        }

        $scope.isLogged = function () {
            return Authentication.isLogged;
        }

    });