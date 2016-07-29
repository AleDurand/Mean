'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsIndexController', function ($scope, $rootScope, $route, $location, Album) {
        $scope.showModal = false;
        $scope.AlbumType = $('#navbar li.active').attr("id") == undefined ? localStorage.getItem('active') : $('#navbar li.active').attr("id");
        $scope.error = false;
        $scope.errorMessage = ""; 
        if($('#inicio').hasClass('active') || localStorage.getItem('active') == 'inicio'){
            $('#layerslider').layerSlider('start'); 
            $('slider').show();
        }else{
            $('#layerslider').layerSlider('stop'); 
            $('slider').hide();
        }
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
            $('#filecount').filestyle({
                input: false,
                buttonText: 'Seleccionar imagen',
                buttonName: 'btn-primary',
                iconName: 'glyphicon glyphicon-folder-open'
            });
            $('#clear').click(function () {
                $('#filecount').filestyle('clear');
            });
            $('#filecount2').filestyle({
                input: false,
                buttonText: 'Seleccionar imagen',
                buttonName: 'btn-primary',
                iconName: 'glyphicon glyphicon-folder-open'
            });
            $('#clear2').click(function () {
                $('#filecount2').filestyle('clear');
            });
        };

        $scope.success = null;
        $scope.error = null;
        this.save = function (album, image, imageHeader) {
            Album.create(album)
                .success(function (response) {
                    $scope.success = true;
                    var fd = new FormData();
                    var images = [image,imageHeader];
                    fd.append('album', angular.toJson(response));
                    fd.append('file' + 0, images[0]._file);
                    fd.append('file' + 1, images[1]._file);
                    Album.addPhotos(response.name, fd)
                        .success(function (response) {
                            $scope.success = true;
                            response.albumImage = response.photos[0]._id;
                            response.albumImageHeader = response.photos[1]._id;
                            response.albumImageHeaderPath = response.photos[1].path;
                            Album.update(response.name, response)
                                .success(function (response) {
                                    $scope.showModal = false;
                                    $('body').removeClass('modal-open');
                                    $('.modal-backdrop').remove();
                                    $location.path('/');
                                })
                                .error(function (response) {
                                    $scope.error = true;
                                    $scope.errorMessage = "Ya hay un álbum con igual foto de header.";
                                });
                        })
                        .error(function (response) {
                            $scope.error = response.message;
                        });

                })
                .error(function (response) {
                    $scope.error = true;
                    $scope.errorMessage = "No pueden haber dos álbumes con igual nombre";
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
            $scope.confirmDelete = true;
            $scope.dialog = "¿Desea eliminar el álbum " + album.name + "?"
            $scope.showDeleteModal = true;
            $(document).off('click', '#Aceptar').on('click', '#Aceptar', function () {
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                Album.delete(album.name)
                    .success(function (response) {
                        $scope.success = true;
                        $scope.album = response;
                        $route.reload();
                    })
                    .error(function (response) {
                        $scope.error = response.message;
                    });
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
            scope: true,
            transclude: true,
            replace: true,
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

angular.module('AlbumsModule')    
    .directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ctrl){
            ctrl.$setValidity('validFile', el.val() != '' && el.val() != undefined);
            //change event is fired when file is selected
            el.bind('change',function(){
                ctrl.$setValidity('validFile', el.val() != '' && el.val() != undefined);
                scope.$apply(function(){
                    ctrl.$setViewValue(el.val());
                    ctrl.$render();
                });
            });
        }
    }
});