'use strict';

angular.module('AlbumsModule')
    .controller('AlbumsShowController',['$scope','$rootScope','$route','$http', '$routeParams', 'Album', 'Contact', function ($scope, $rootScope, $route, $http, $routeParams, Album, Contact) {
        $('#layerslider').layerSlider('stop'); 
        $('slider').hide();
        $scope.dialog = null;
        $scope.modalDialog = false;
        $scope.emailModal = false;
        $scope.confirmDelete = false;
        $scope.showtooltipName = false;
        $scope.showtooltipDescription = false;
        $scope.prevDescription = '';
        $scope.prevName = '';
        $scope.toEmail = null;
        $scope.mailSended = false;
        $scope.error = false;
        $scope.errorMessage = "";
        Album.get($routeParams.name)
            .success(function (response) {
                $scope.success = true;
                $scope.album = response;
                $scope.url = encodeURIComponent(response.albumImageHeaderPath);
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
            Album.addPhotos($routeParams.name, fd)
                .success(function (response) {
                    $scope.success = true;
                    $scope.album = response;
                    $route.reload();
                })
                .error(function (response) {
                    $scope.error = true;
                    $scope.errorMessage = response.message;
                });
        };
        this.selected = function (photo, album) {
            album.albumImage = photo._id;
            album.albumImagePath = photo.path;
            Album.update(album.name, album);
        };
        this.hideTooltips = function (e) {
            e.preventDefault();
            getPrevValues();
            $scope.showtooltipName = false;
            $scope.showtooltipDescription = false;
            $scope.album.name = $scope.prevName;
            $scope.album.description = $scope.prevDescription;
            $('#editName').removeClass('glyphicon-ok');
            $('#editName').addClass('glyphicon-edit');
            $('#editDescription').removeClass('glyphicon-ok');
            $('#editDescription').addClass('glyphicon-edit');
            e.stopPropagation();
        }
        this.toggleTooltipName = function (e, album, name) {
            e.stopPropagation();
            $scope.showtooltipName = !$scope.showtooltipName;
            if (!$scope.showtooltipName) {
                album.name = name;
                Album.update(album.name, album);
                $('#editName').removeClass('glyphicon-ok');
                $('#editName').addClass('glyphicon-edit');
            } else {
                $('#editName').removeClass('glyphicon-edit');
                $('#editName').addClass('glyphicon-ok');
            }
        }
        function getPrevValues() {
            Album.get($routeParams.name)
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
                Album.update(album.name, album);
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
                email.photos="";
                if(album.photos[i].path != album.albumImageHeaderPath)
                    if (document.getElementById(album.photos[i].name + '_selected').getAttribute('aria-checked')=="true"){
                        var e = document.getElementById(album.photos[i].name + '_tamaño');
                        var tamaño = e.options[e.selectedIndex].value;
                        if (photoNames == "") {
                            photoNames = album.photos[i].name.split('.')[0] + ". En tamaño: " + tamaño + '\n';
                        } else
                            photoNames = photoNames + ', ' + album.photos[i].name.split('.')[0] + ". En tamaño: " + tamaño + '\n';
                    }
            }
            email.photos = photoNames;
            email.album = album.name;
            email.emailTo = $rootScope.contact.email;
            Contact.sendEmail(email)
                .success(function (response) {
                    $scope.mailSended = true;
                    window.setTimeout(function(){$scope.emailModal = false; $('.close').click();}, 4500);                    
                })
                .error(function (response) {
                    $scope.mailSended = false;
                    $scope.error = response.message;
                });
        }

        this.openEmail = function(){
            $scope.mailSended=false;
            $scope.emailModal = true;
        }

        this.deletePhoto = function (photo, album) {
            if (album.photos.length == 1) {
                $scope.confirmDelete = false;
                $scope.dialog = "No es posible eliminar la imágen debido a que el álbum quedará vacío."
                $scope.modalDialog = true;
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
                    Album.deletePhoto(album.name, photo._id)
                        .success(function (response) {
                            $scope.success = true;
                            $route.reload();
                        });
                })
            }
        };

        this.onChange = function(id){
            var element = document.getElementById(id);
            if(element.classList.contains('nodisplay')){
                element.classList.remove('nodisplay');
                element.classList.add('displayy');
            }else{
                element.classList.remove('displayy');
                element.classList.add('nodisplay');
            }
        }

    }]);
 
    