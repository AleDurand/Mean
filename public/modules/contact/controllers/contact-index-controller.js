'use strict';

angular.module('ContactModule')
    .controller('ContactIndexController', function ($scope, $rootScope, $route, Contact) {
        $('#Albums').removeClass('active');
        $('#Home').removeClass('active');
        $('#Contact').addClass('active');
        $('#Login').removeClass('active');
        $scope.credits = "Mariano Rodecker - Ingeniería de Aplicaciones Web"
        $scope.success= false;
        Contact.get()
            .success(function (response) {
                $scope.success = true;
                $scope.contact = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
            
        $scope.showtooltipAddress = false;
        $scope.toggleTooltipAddress = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipAddress = !$scope.showtooltipAddress;
            if (!$scope.showtooltipAddress) {
                Contact.update(contact);
                $('#editAddress').removeClass('glyphicon-ok');
                $('#editAddress').addClass('glyphicon-edit');
            } else {
                $('#editAddress').removeClass('glyphicon-edit');
                $('#editAddress').addClass('glyphicon-ok');
            }
        }
        
        $scope.showtooltipCity = false;
        $scope.toggleTooltipCity = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipCity = !$scope.showtooltipCity;
            if (!$scope.showtooltipCity) {
                Contact.update(contact);
                $('#editCity').removeClass('glyphicon-ok');
                $('#editCity').addClass('glyphicon-edit');
            } else {
                $('#editCity').removeClass('glyphicon-edit');
                $('#editCity').addClass('glyphicon-ok');
            }
        }
        
        $scope.showtooltipPhoneNumber = false;
        $scope.toggleTooltipPhoneNumber = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipPhoneNumber = !$scope.showtooltipPhoneNumber;
            if (!$scope.showtooltipPhoneNumber) {
                Contact.update(contact);
                $('#editPhoneNumber').removeClass('glyphicon-ok');
                $('#editPhoneNumber').addClass('glyphicon-edit');
            } else {
                $('#editPhoneNumber').removeClass('glyphicon-edit');
                $('#editPhoneNumber').addClass('glyphicon-ok');
            }
        }
        
        $scope.showtooltipEmail = false;
        $scope.toggleTooltipEmail = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipEmail = !$scope.showtooltipEmail;
            if (!$scope.showtooltipEmail) {
                Contact.update(contact);
                $('#editEmail').removeClass('glyphicon-ok');
                $('#editEmail').addClass('glyphicon-edit');
            } else {
                $('#editEmail').removeClass('glyphicon-edit');
                $('#editEmail').addClass('glyphicon-ok');
            }
        }
        
        $scope.showtooltipAppDescription = false;
        $scope.toggleTooltipAppDescription = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipAppDescription = !$scope.showtooltipAppDescription;
            if (!$scope.showtooltipAppDescription) {
                Contact.update(contact);
                $('#editAppDescription').removeClass('glyphicon-ok');
                $('#editAppDescription').addClass('glyphicon-edit');
            } else {
                $('#editAppDescription').removeClass('glyphicon-edit');
                $('#editAppDescription').addClass('glyphicon-ok');
            }
        }
        
        $scope.hideTooltips = function () {
            getPrevValues();
            $scope.showtooltipAddress = false;
            $('#editAddress').removeClass('glyphicon-ok');
            $('#editAddress').addClass('glyphicon-edit');
            $('#editCity').removeClass('glyphicon-ok');
            $('#editCity').addClass('glyphicon-edit')
            // getPrevValues();
            // $scope.showtooltipName = false;
            // $scope.showtooltipDescription = false;
            // $scope.album.name = $scope.prevName;
            // $scope.album.description = $scope.prevDescription;
            // $('#editName').removeClass('glyphicon-ok');
            // $('#editName').addClass('glyphicon-edit');
            // $('#editDescription').removeClass('glyphicon-ok');
            // $('#editDescription').addClass('glyphicon-edit');
        }
        
        function getPrevValues(){
             Contact.get()
            .success(function (response) {
                $scope.success = true;
                $scope.contact = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
        }
        
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