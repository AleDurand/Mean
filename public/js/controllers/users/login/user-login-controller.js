'use strict'

angular.module('meanApp')
.controller('UserLoginController', function ($scope, $location, $window, AuthenticationService) {
        
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.localStorage.token = authdata;
                $location.path("/albums");
                AuthenticationService.isLogged = true;
            }
        }
 
        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.localStorage.token;
                $location.path("/");
            }
        }
    });