angular.module('meanApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{
			redirectTo: '/albums'
		})
		.when('/albums',{
			templateUrl: 'templates/pages/albums/index.html',
			controller: 'AlbumsIndexController',
			controllerAs: 'indexController'
		})
		.when('/albums/:id', {
			templateUrl: 'templates/pages/albums/show.html',
			controller: 'AlbumsShowController',
			controllerAs: 'showController'
		})
		.otherwise({ redirectTo: '/' });
}]);



