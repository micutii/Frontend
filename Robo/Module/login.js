myApp.controller('loginController', function ($scope, requests) {
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

        requests.login($scope.loginForm).then(function (response) {
            if (requests.isLogged) {
                location.href = 'index.html!#/maps';
            }
            else {

            }
        });

       

    }

    $scope.submitRegister = function () {
        if ($scope.registerForm.email == '' || $scope.registerForm.password == '' || $scope.registerForm.fullName == '') return;

        requests.login($scope.registerForm).then(function (response) {
            if (requests.isLogged) {
                location.href = 'index.html!#/maps';
            }
            else {

            }
        });
        
    }
    
});