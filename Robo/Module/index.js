myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider) {
    var maps = {
        name: 'maps',
        url: '/maps',
        templateUrl: 'maps.html'
    }

    var login = {
        name: 'login',
        url: '/login',
        templateUrl: 'login.html'
    }

    $stateProvider.state(maps);
    $stateProvider.state(login);
});