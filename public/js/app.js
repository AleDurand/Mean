angular.module('meanApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/albums',{
			templateUrl: 'templates/pages/albums/index.html',
			controller: 'AlbumsIndexController',
			controllerAs: 'indexController'
		})
		.when('/albums/create', {
			templateUrl: 'templates/pages/albums/create.html',
			controller: 'AlbumsCreateController',
			controllerAs: 'createController'
		})
		.when('/albums/:name', {
			templateUrl: 'templates/pages/albums/show.html',
			controller: 'AlbumsShowController',
			controllerAs: 'showController'
		})
		.when('/albums/:name/photos', {
			templateUrl: 'templates/pages/photos/add.html',
			controller: 'AlbumsAddPhotosController',
			controllerAs: 'addController'
		})
		.otherwise({ redirectTo: '/albums' });
}]);



