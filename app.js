/**
 * Created by Andro on 30.7.2015..
 */

    // , 'angulartics'
var app = angular.module('SlonMp3', ['ngRoute', 'ngAnimate', 'angulartics.google.analytics']);

app.config(function ($routeProvider) {
    'use strict';

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'app/controllers/home.html'
    }).otherwise({
        redirectTo: '/'
    });

});

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    'use strict';
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
