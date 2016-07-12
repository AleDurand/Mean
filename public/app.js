'use strict';

var app = angular.module('meanApp', ['ngSanitize', 'toggle-switch', 'ngRoute', 'UsersModule', 'SliderModule', 'AlbumsModule', 'ContactModule']);

app.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);

app.run(function($rootScope) {
    $rootScope.user = false;
    $rootScope.userLogged = null;
    $rootScope.contact = null;
});

