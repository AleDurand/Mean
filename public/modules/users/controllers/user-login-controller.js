'use strict'

angular.module('UsersModule')
    .controller('UserLoginController', function ($scope, $rootScope, $location, $window, User, Authentication) {
        $scope.changePassword = false;
        $scope.master = {};        
        //Admin User Controller (login, logout)
        this.login = function (username, password) {
            if (username !== undefined && password !== undefined) {
                var authdata = btoa(username + ':' + password);
                $window.sessionStorage.token = authdata;
                $scope.submitted = true;
                User.getByUsername(username)
                    .success(function (response) {
                        Authentication.user = true;
                        $scope.user = response;
                        $rootScope.user = true;
                        $scope.success = true;
                        $('#Login').removeClass('active');
                        $('#Albums').addClass('active');
                        $scope.loginError = false;
                        $scope.loginform.username.$setValidity("notFound", true);
                        $scope.loginform.password.$setValidity("notFound", true);       
                        $scope.loginform.$setPristine();
                        $scope.loginform.username.$setUntouched();
                        $scope.loginform.password.$setUntouched();
                        $scope.loginform.newPassword.$setUntouched();
                        $scope.loginform.verifyPassword.$setUntouched();
                        $scope.loginform.$setUntouched();

                        $scope.loginform.newPassword.$setValidity("notEqual", false);
                        $scope.loginform.verifyPassword.$setValidity("notEqual", false);
                    })
                    .error(function (error) {
                        Authentication.user = null;
                        delete $window.sessionStorage.token;
                        $scope.loginError = true;
                        $scope.loginform.username.$setValidity("notFound", false);
                        $scope.loginform.password.$setValidity("notFound", false);
                    })
            }
        }

        this.logout = function () {
            if (Authentication.user) {
                $scope.submitted = false;
                Authentication.user = null;
                delete $window.sessionStorage.token;
                $rootScope.user = false;
                $scope.user = angular.copy($scope.master);
            }
        }

        this.isLogged = function () {
            return Authentication.user;
        }

        this.cancelChangePassword = function () {
            $scope.changePassword = false;
            $scope.newPassword = '';
            $scope.verifyPassword='';
            $scope.loginform.$setPristine();
            $scope.loginform.newPassword.$setUntouched();
            $scope.loginform.verifyPassword.$setUntouched();
        }

        this.cambiarContrasena = function () {
            $scope.changePassword = true;
        }

        this.confirmChangePassword = function (newPassword, verifyPassword) {
            if (newPassword != undefined && verifyPassword != undefined && newPassword == verifyPassword) {
                $scope.user.password = newPassword;
                User.update($scope.user)
                    .success(function () {
                        var authdata = btoa($scope.user.username + ':' + newPassword);
                        $window.sessionStorage.token = authdata;
                        $scope.loginform.newPassword.$setValidity("notEqual", true);
                        $scope.loginform.verifyPassword.$setValidity("notEqual", true);
                        $location.path('/');
                    });
            } else {
                $scope.loginform.newPassword.$setValidity("notEqual", false);
                $scope.loginform.verifyPassword.$setValidity("notEqual", false);
            }
        }


    });
 angular.module('UsersModule')   
    .directive('enterDirective', function () {
    return {
        link: function (scope, element, attrs) {
            $(element).keypress(function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();                    
                }
            });
        }
    }
});