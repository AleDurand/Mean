'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsShowController', function ($scope, $route, $http, $routeParams, Album, Authentication) {
        $scope.user = Authentication.user;
        $scope.dialog = null;
        $scope.modalDialog = false;
        $scope.confirmDelete = false;
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
            $http.post('/api/albums/' + $routeParams.id + '/photos', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
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

        this.deletePhoto = function (photo, album) {
            if (album.photos.length == 1) {
                $scope.confirmDelete = true;
                $scope.dialog = "Si elimina esta imagen el álbum quedará vacío. ¿Desea continuar?"
                $scope.modalDialog = true;
                $(document).off('click','#Aceptar').on('click', '#Aceptar', function () {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    Album.deletePhoto(album._id, photo._id)
                        .success(function (response) {
                            $scope.success = true;
                            $route.reload();
                        });

                });
            } else if (photo._id == album.albumImage) {
                $scope.confirmDelete=false;
                $scope.dialog = "No es posible eliminar esta imagen porque es la portada del álbum. Si desea eliminarla por favor seleccione otra portada.";
                $scope.modalDialog = true;
            } else {
                $scope.confirmDelete = true;
                $scope.dialog = "¿Está seguro que desea eliminar la imagen?"
                $scope.modalDialog = true;
                $(document).off('click','#Aceptar').on('click', '#Aceptar', function () {
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