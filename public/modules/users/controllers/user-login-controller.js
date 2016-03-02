'use strict'

angular.module('UsersModule')
    .controller('UserLoginController', function ($scope, $rootScope, $location, $window, User, Authentication) {
        $('#Albums').removeClass('active');
        $('#Home').removeClass('active');
        $('#Contact').removeClass('active');
        $('#Login').addClass('active');
        $scope.changePassword = false;
        $scope.oldPassword = "hola Marian";             
        //Admin User Controller (login, logout)
        this.login = function (username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.sessionStorage.token = authdata;
                User.getByUsername(username)
                    .success(function (response) {
                        Authentication.user = true;
                        $scope.user = response;
                        $rootScope.user = true;
                        $scope.success = true;
                        $('#Login').removeClass('active');
                        $('#Albums').addClass('active');
                        $scope.loginform.username.$setValidity("notFound", true);
                        $scope.loginform.password.$setValidity("notFound", true);
                    })
                    .error(function (error) {
                        Authentication.user = null;
                        delete $window.sessionStorage.token;
                        $scope.error = error.message;
                        $scope.loginform.username.$setValidity("notFound", false);
                        $scope.loginform.password.$setValidity("notFound", false);
                    })
            }
        }

        this.logout = function () {
            if (Authentication.user) {
                Authentication.user = null;
                delete $window.sessionStorage.token;
                $rootScope.user = false;
                $scope.user.username = "";
                $scope.user.password = "";
            }
        }

        this.isLogged = function () {
            return Authentication.user;
        }

        this.cancelChangePassword = function () {
            $scope.changePassword = false;
        }

        this.cambiarContrasena = function () {
            $scope.changePassword = true;
        }

        this.confirmChangePassword = function (newPassword, verifyPassword) {
            if (newPassword != undefined && verifyPassword != undefined && newPassword == verifyPassword) {
                $scope.user.password = newPassword;
                $scope.loginform.newPassword.$setValidity("notEqual", true);
                $scope.loginform.verifyPassword.$setValidity("notEqual", true);
                User.update($scope.user)
                    .success(function () {
                        var authdata = btoa($scope.user.username + ':' + newPassword);
                        $window.sessionStorage.token = authdata;
                    });
            } else {
                $scope.loginform.newPassword.$setValidity("notEqual", false);
                $scope.loginform.verifyPassword.$setValidity("notEqual", false);
            }
        }


    });