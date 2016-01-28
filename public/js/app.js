angular.module('meanApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/albums',{
			templateUrl: 'templates/pages/albums/index.html',
			controller: 'AlbumsIndexController',
			controllerAs: 'indexController',
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
		.when('/albums/:id/photos', {
			templateUrl: 'templates/pages/photos/add.html',
			controller: 'AlbumsAddPhotosController',
			controllerAs: 'addController'
		})
		.when('/login', {
			templateUrl: 'templates/pages/users/login/index.html',
			controller: 'UserLoginController',
			controllerAs: 'loginController'
		})
		.otherwise({ redirectTo: '/albums' });
}]);



