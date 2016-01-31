'use strict'

angular.module('UsersModule')
    .controller('UserLoginController', function ($scope, $window, Authentication) {
               
        //Admin User Controller (login, logout)
        this.login = function (username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.localStorage.token = authdata;
                Authentication.isLogged = true;
            }
        }

        this.logout = function () {
            if (Authentication.isLogged) {
                Authentication.isLogged = false;
                delete $window.localStorage.token;
            }
        }

        this.isLogged = function () {
            return Authentication.isLogged;
        }

    });