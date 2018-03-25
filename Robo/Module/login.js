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
        console.log($scope.loginForm);

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
        console.log($scope.registerForm);
       
        var req = {
            method: 'GET',
            url: 'http://10.0.0.76:8080/api/events/get',
            withCredentials: true
        }

        $http(req).then(function (data, statusCode) {
            console.log("statusCode: ", statusCode);
            console.log("data: ", data);
        }
            , function (data, statusCode) {

            });
        
    }
    /*
    $http.get('http://10.0.0.76:8080/api/pins/get').then(function (data, statusCode) {
        console.log("statusCode: ", statusCode);
        console.log("data: ", data);
    }
    
        , function (data, statusCode) {

        });
    */
});