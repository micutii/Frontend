myApp.controller('loginController', function ($scope, $rootScope, requests) {
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
            if ($rootScope.isLogged) {
                requests.isAdmin($rootScope.username).then(function (response) {
                    $rootScope.isAdmin = response.data;
                });
            }
            else {
            }
        });

       

    }

    $scope.submitRegister = function () {
        if ($scope.registerForm.email == '' || $scope.registerForm.password == '' || $scope.registerForm.fullName == '') return;

        requests.signup($scope.registerForm).then(function (response) {
            if (response.status == 200)
            {
                $scope.toggleRegister();
                $scope.toggleLogin();
            }
        });
        
    }
    
});