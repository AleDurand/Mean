'use strict';


angular.module('SliderModule')
	.controller('SliderEditController', SliderEditController);
SliderEditController.$inject = ['$scope', '$rootScope','$route', '$location', 'Slider'];

function SliderEditController($scope, $rootScope, $route, $location, Slider) {
        $scope.showModal = false;
		
		Slider.all()
            .success(function (response) {
                $scope.images = response;
            })

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
        };

        $scope.success = null;
        $scope.error = null;
        $scope.save = function (cover, image) {
        	var fd = new FormData();
            var images = [image];
            fd.append('cover', angular.toJson(cover));
            fd.append('file' + 0, images[0]._file); 
            Slider.update(cover._id, fd)
                .success(function (response) {
                    $scope.success = true;
                    $scope.showModal = false;
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                   	$scope.cover = null;
                   	$route.reload();
                })
                .error(function (response) {
                    $scope.error = response.message;
                    $scope.cover = null;
                });
        }; 

        $scope.update = function (cover){
            $scope.toggleModal();
            $scope.cover = cover;
        };   


	};
 