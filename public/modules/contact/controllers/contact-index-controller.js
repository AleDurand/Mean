'use strict';

angular.module('ContactModule')
    .controller('ContactIndexController', function ($scope, $rootScope, $route, Contact) {
        $scope.credits = "Mariano Rodecker - Alejandro Durand"
        $scope.success = false;
        $('#inicio').removeClass('active');
        $('a.ls-nav-stop').click();
        $('#layerslider').hide();
        if($('#inicio').hasClass('active') || localStorage.getItem('active') == 'inicio'){
            $('a.ls-nav-start').click();
            $('slider').show();
            $('#layerslider').show();
        }else{
            $('a.ls-nav-stop').click();
            $('slider').hide();
        }
        Contact.get()
            .success(function (response) {
                $scope.success = true;
                $scope.contact = response;
                $rootScope.contact = response; 
                $scope.facePageToshow = '/' + $rootScope.contact.facebookPage.split('/')[3];               
            })
            .error(function (response) {
                $scope.error = response.message;
            });

        $scope.showtooltipAddress = false;
        $scope.toggleTooltipAddress = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipAddress = !$scope.showtooltipAddress;
            if (!$scope.showtooltipAddress) {
                Contact.update(contact)
                .success(function(){
                    $rootScope.contact.address = contact.address;
                });
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
                Contact.update(contact).
                success(function(){
                    $rootScope.contact.email = contact.email;
                });
                $('#editEmail').removeClass('glyphicon-ok');
                $('#editEmail').addClass('glyphicon-edit');
            } else {
                $('#editEmail').removeClass('glyphicon-edit');
                $('#editEmail').addClass('glyphicon-ok');
            }
        }

        $scope.showtooltipFacebookPage = false;
        $scope.toggleTooltipFacebookPage = function (e, contact) {
            e.stopPropagation();
            $scope.showtooltipFacebookPage = !$scope.showtooltipFacebookPage;
            if (!$scope.showtooltipFacebookPage) {
                Contact.update(contact)
                .success(function(){
                    $rootScope.contact.facebookPage = contact.facebookPage;
                });
                $scope.facePageToshow = '/' + $rootScope.contact.facebookPage.split('/')[3];
                $('#editFacebookPage').removeClass('glyphicon-ok');
                $('#editFacebookPage').addClass('glyphicon-edit');
            } else {
                $('#editFacebookPage').removeClass('glyphicon-edit');
                $('#editFacebookPage').addClass('glyphicon-ok');
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
            $scope.showtooltipCity = false;
            $scope.showtooltipPhoneNumber = false;
            $scope.showtooltipEmail = false;
            $scope.showtooltipFacebookPage = false;
            $scope.showtooltipAppDescription = false;
            $('#editAddress').removeClass('glyphicon-ok');
            $('#editAddress').addClass('glyphicon-edit');
            $('#editCity').removeClass('glyphicon-ok');
            $('#editCity').addClass('glyphicon-edit');
            $('#editPhoneNumber').removeClass('glyphicon-ok');
            $('#editPhoneNumber').addClass('glyphicon-edit');
            $('#editEmail').removeClass('glyphicon-ok');
            $('#editEmail').addClass('glyphicon-edit');
            $('#editFacebookPage').removeClass('glyphicon-ok');
            $('#editFacebookPage').addClass('glyphicon-edit');
            $('#editAppDescription').removeClass('glyphicon-ok');
            $('#editAppDescription').addClass('glyphicon-edit')
        }

        function getPrevValues() {
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
                    $scope.error = false;
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