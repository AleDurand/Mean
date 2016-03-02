'use strict';

var app = angular.module('meanApp', ['ngRoute', 'AlbumsModule', 'UsersModule', 'ContactModule']);


app.run(function($rootScope) {
    $rootScope.user = false;
});

