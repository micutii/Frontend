myApp = angular.module('myApp', ['ui.router', "isteven-multi-select"]);
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
    var pins = {
        name: 'pins',
        url: '/pins',
        templateUrl: 'pins.html'
    }

    $stateProvider.state(maps);
    $stateProvider.state(login);
    $stateProvider.state(pins);
});