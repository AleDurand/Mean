'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsShowController', function ($scope, $rootScope, $route, $http, $routeParams, Album, Contact) {
        $scope.dialog = null;
        $scope.modalDialog = false;
        $scope.confirmDelete = false;
        $scope.showtooltipName = false;
        $scope.showtooltipDescription = false;
        $scope.prevDescription = '';
        $scope.prevName = '';
        $scope.toEmail = null;

        Album.get($routeParams.id)
            .success(function (response) {
                $scope.success = true;
                $scope.album = response;
            })
            .error(function (response) {
                $scope.error = response.message;
            });
        this.save = function (album, images) {
            var fd = new FormData();
            fd.append('album', angular.toJson(album));
            for (var i = 0; i < images.length; i++) {
                fd.append('file' + i, images[i]._file);
            }
            Album.addPhotos($routeParams.id, fd)
                .success(function (response) {
                    $scope.success = true;
                    $scope.album = response;
                    $route.reload();
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        };
        this.selected = function (photo, album) {
            album.albumImage = photo._id;
            Album.update(album._id, album);
        };
        this.hideTooltips = function () {
            getPrevValues();
            $scope.showtooltipName = false;
            $scope.showtooltipDescription = false;
            $scope.album.name = $scope.prevName;
            $scope.album.description = $scope.prevDescription;
            $('#editName').removeClass('glyphicon-ok');
            $('#editName').addClass('glyphicon-edit');
            $('#editDescription').removeClass('glyphicon-ok');
            $('#editDescription').addClass('glyphicon-edit');
        }
        this.toggleTooltipName = function (e, album, name) {
            e.stopPropagation();
            $scope.showtooltipName = !$scope.showtooltipName;
            if (!$scope.showtooltipName) {
                album.name = name;
                Album.update(album._id, album);
                $('#editName').removeClass('glyphicon-ok');
                $('#editName').addClass('glyphicon-edit');
            } else {
                $('#editName').removeClass('glyphicon-edit');
                $('#editName').addClass('glyphicon-ok');
            }
        }
        function getPrevValues() {
            Album.get($routeParams.id)
                .success(function (response) {
                    $scope.success = true;
                    $scope.album.name = response.name;
                    $scope.album.description = response.description;
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        }

        this.toggleTooltipDescription = function (e, album, description) {
            e.stopPropagation();
            $scope.showtooltipDescription = !$scope.showtooltipDescription;
            if (!$scope.showtooltipDescription) {
                album.description = description;
                Album.update(album._id, album);
                $('#editDescription').removeClass('glyphicon-ok');
                $('#editDescription').addClass('glyphicon-edit');
            } else {
                $('#editDescription').removeClass('glyphicon-edit');
                $('#editDescription').addClass('glyphicon-ok');
            }
        }
        this.sendEmail = function (email, album) {
            var photoNames = ""
            for (var i = 0; i < album.photos.length; i++) {
                //TODO: cambiar
                if (document.getElementById(album.photos[i].name + '_selected').getAttribute('aria-checked'))
                    if (photoNames == "") {
                        photoNames = album.photos[i].name.split('.')[0]
                    } else
                        photoNames = photoNames + ', ' + album.photos[i].name.split('.')[0];
            }
            email.photos = photoNames;
            Contact.sendEmail(email)
                .success(function (response) {
                    $scope.success = true;
                })
                .error(function (response) {
                    $scope.error = response.message;
                });
        }

        this.deletePhoto = function (photo, album) {
            if (album.photos.length == 1) {
                $scope.confirmDelete = true;
                $scope.dialog = "Si elimina esta imagen el álbum quedará vacío. ¿Desea continuar?"
                $scope.modalDialog = true;
                $(document).off('click', '#Aceptar').on('click', '#Aceptar', function () {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    Album.deletePhoto(album._id, photo._id)
                        .success(function (response) {
                            $scope.success = true;
                            $route.reload();
                        });

                });
            } else if (photo._id == album.albumImage) {
                $scope.confirmDelete = false;
                $scope.dialog = "No es posible eliminar esta imagen porque es la portada del álbum. Si desea eliminarla por favor seleccione otra portada.";
                $scope.modalDialog = true;
            } else {
                $scope.confirmDelete = true;
                $scope.dialog = "¿Está seguro que desea eliminar la imagen?"
                $scope.modalDialog = true;
                $(document).off('click', '#Aceptar').on('click', '#Aceptar', function () {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    Album.deletePhoto(album._id, photo._id)
                        .success(function (response) {
                            $scope.success = true;
                            $route.reload();
                        });
                })
            }
        };

    });
 
    