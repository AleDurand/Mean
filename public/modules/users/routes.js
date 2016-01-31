angular.module('UsersModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/users/login', {
                templateUrl: 'modules/users/views/login.html',
                controller: 'UserLoginController',
                controllerAs: 'loginController',
            })
    }]);
