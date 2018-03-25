myApp = angular.module('myApp', ['ui.router', "isteven-multi-select"]);
myApp.config(function ($stateProvider, $urlRouterProvider) {
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
    $urlRouterProvider.when('http://localhost:3432', '/maps/');
    $urlRouterProvider.otherwise('/maps');

    $stateProvider.state(maps);
    $stateProvider.state(login);
    $stateProvider.state(pins);
});

myApp.controller('indexController', ["$scope", "$rootScope", "requests", function ($scope, $rootScope, requests) {
    requests.checkIfLogged().then(function (response) {
        if($rootScope.isLogged) {
            requests.checkIfAdmin()
        }
    });
    $scope.selectedTypes = [];
    $scope.requests = requests;
    //$rootScope.watch('pin', function (current, last) {
    //
    //});
}]);