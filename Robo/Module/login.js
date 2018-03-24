myApp.controller('loginController', function ($scope, $http) {
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

        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        }

        var req = {
            method: 'GET',
            url: 'http://10.0.0.76:8080/api/login',
            withCredentials: true,
            headers: {
                'Authorization': make_base_auth($scope.loginForm.email, $scope.loginForm.password)
            }
        }

        $http(req).then(function (data) {
            //$scope.username = $scope.log
        }
            , function (data) {

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