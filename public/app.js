'use strict';

var app = angular.module('meanApp', ['ngSanitize', 'toggle-switch', 'ngRoute', 'AlbumsModule', 'UsersModule', 'ContactModule', 'SliderModule']);


app.run(function($rootScope) {
    $rootScope.user = false;
    $rootScope.userLogged = null;
    $rootScope.contact = null;
});

