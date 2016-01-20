angular.module('meanApp')
.controller('AlbumsIndexController', function($scope, Album) {
	Album.all()
		.success(function(data) {
			//$scope.albums = data;
			$scope.myInterval = 5000;
			$scope.albums = [
			{
	            path: 'https://forrestlyman.files.wordpress.com/2015/02/10753367973_6a56e02252_z.jpg',
	            name: 'La Hoguera',
	            description: 'fine dining, baja style'
	        },
	        {
	            path: 'https://forrestlyman.files.wordpress.com/2015/02/12193611106_d83c9f10ae_z.jpg',
	            name: 'Organic tomatoes',
	            description: 'basic and queso cotija'
	        },
	        {
	            path: 'https://forrestlyman.files.wordpress.com/2015/02/10636874903_3df6de12b9_z.jpg',
	            name: 'Sweetbreads',
	            description: 'a la mesquite'
	        },
	        {
	            path: 'https://forrestlyman.files.wordpress.com/2015/02/10753161186_a2fc84ec94_z.jpg',
	            name: 'Cowboy steak',
	            description: 'Sonoran range beef'
	        }
			];
		});
});