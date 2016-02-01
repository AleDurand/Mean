'use strict'

angular.module('UsersModule')
    .controller('UserLoginController', function ($scope, $window, User, Authentication) {
               
        //Admin User Controller (login, logout)
        this.login = function (username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.localStorage.token = authdata;
                User.getByUsername(username)
                    .success(function(response) {
                        Authentication.user = response;
                    })
                    .error(function(error) {
                        Authentication.user = null;
                        delete $window.localStorage.token;
                    })
            }
        }

        this.logout = function () {
            if (Authentication.user) {
                Authentication.user = null;
                delete $window.localStorage.token;
            }
        }

        this.isLogged = function () {
            return Authentication.user;
        }

    });