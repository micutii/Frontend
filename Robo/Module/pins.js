myApp.controller('pinsController', function ($scope, requests) {
    requests.allPins().then(function (response) {
        $scope.pins = response.data;
    });
});