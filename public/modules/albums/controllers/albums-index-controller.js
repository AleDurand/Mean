'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsIndexController', function ($scope, $route, $location, Album, Authentication) {
        $('#Albums').addClass('active');
        $('#Home').removeClass('active');
        $('#Contact').removeClass('active');
        $('#Login').removeClass('active');
        $scope.user = Authentication.user;
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
            $('#filecount').filestyle({
                input:false,
                buttonText: 'Seleccionar imagen',
                buttonName: 'btn-primary',
                iconName: 'glyphicon glyphicon-folder-open'
            });
            $('#clear').click(function () {
                $('#filecount').filestyle('clear');
            });
        };

        $scope.success = null;
        $scope.error = null;
        this.save = function (album) {
            Album.create(album)
            .success(function (response) {
                    $scope.success = true;
                    $scope.albums = response;
                    $location.path('/');
                    $scope.showModal = false;
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };
        Album.all()
            .success(function (response) {
                $scope.success = true;
                $scope.albums = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
        this.delete = function (album) {
            Album.delete(album._id)
                .success(function (response) {
                    $scope.success = true;
                    $scope.album = response;
                    $route.reload();
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };

    });
angular.module('AlbumsModule')
    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });