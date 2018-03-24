
var loginApp = angular.module("loginApp", []);
loginApp.controller('loginController', function ($scope, $http) {
    $scope.selectedTypes = [];
    $scope.showLogin = true;
    $scope.showRegister = false;

    $scope.toggleLogin = function () {
        $scope.showLogin = !$scope.showLogin;
    };

    $scope.toggleRegister = function () {
        $scope.showRegister = !$scope.showRegister;
    };

    $scope.loginForm = {
        email: '',
        password: ''
    };

    $scope.registerForm = {
        fullName: '',
        email: '',
        password: ''
    };

    $scope.submitLogin = function () {
        if ($scope.loginForm.email == '' || $scope.loginForm.password == '') return;
        console.log($scope.loginForm);
    }

    $scope.submitRegister = function () {
        if ($scope.registerForm.email == '' || $scope.registerForm.password == '' || $scope.registerForm.fullName == '') return;
        console.log($scope.registerForm);
    }

    $http.get('http://10.0.0.76:8080/api/pins/get').then(function (data, statusCode) {
        console.log("statusCode: ", statusCode);
        console.log("data: ", data);
    }
        , function (data, statusCode) {

        });
});