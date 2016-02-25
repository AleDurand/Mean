'use strict';

angular.module('ContactModule')
    .controller('ContactIndexController', function ($scope, $route, Contact) {
        $('#Albums').removeClass('active');
        $('#Home').removeClass('active');
        $('#Contact').addClass('active');
        $('#Login').removeClass('active');
        this.sendEmail = function (email) {
            Contact.sendEmail(email)
                .success(function (response) {
                    $scope.success = true;
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        }
        this.disableTab = function () {
            $('#Contact').removeClass('active');
            $('#Albums').addClass('active');
        }
    });