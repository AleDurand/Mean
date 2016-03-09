'use strict';

var app = angular.module('meanApp', ['ngSanitize', 'toggle-switch', 'ngRoute', 'AlbumsModule', 'UsersModule', 'ContactModule']);


app.run(function($rootScope) {
    $rootScope.user = false;
    $rootScope.userLogged = null;
});

