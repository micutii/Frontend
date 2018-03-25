<<<<<<< HEAD
=======
﻿myApp = angular.module('myApp', ['ui.router']);
>>>>>>> 25e9701a47bc9bad24598d363946ca798b2e4153

﻿myApp = angular.module('myApp', ['ui.router', "isteven-multi-select"]);
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