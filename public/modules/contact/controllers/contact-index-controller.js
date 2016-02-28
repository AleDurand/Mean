'use strict';

angular.module('ContactModule')
    .controller('ContactIndexController', function ($scope, $route, Contact) {
        $('#Albums').removeClass('active');
        $('#Home').removeClass('active');
        $('#Contact').addClass('active');
        $('#Login').removeClass('active');
        $scope.success= false;
        this.sendEmail = function (email) {
            Contact.sendEmail(email)
                .success(function (response) {
                    $scope.success = true;
                    $scope.error= false;
                })
                .error(function (response) {
                    $scope.success = false;
                    $scope.error = response.message;
                });
        }
        this.disableTab = function () {
            $('#Contact').removeClass('active');
            $('#Albums').addClass('active');
        }
    });