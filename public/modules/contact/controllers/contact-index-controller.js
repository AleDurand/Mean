'use strict';

angular.module('ContactModule')
    .controller('ContactIndexController', function ($scope, $route, Contact) {
        
        this.sendEmail = function (email) {
            Contact.sendEmail(email)
                .success(function (response) {
                    $scope.success = true;
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        }
    });