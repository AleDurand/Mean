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
		.when('/albums/:id', {
			templateUrl: 'templates/pages/albums/show.html',
			controller: 'AlbumsShowController',
			controllerAs: 'showController'
		})
		.otherwise({ redirectTo: '/albums' });
}]);



