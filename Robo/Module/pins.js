myApp.controller('pinsController', function ($scope, requests) {
    requests.allPins().then(function (response) {
        $scope.pins = response.data;
    });

    $scope.approvePin = function (id) {

    }

    $scope.deletePin = function (id) {
        requests.deletePin(id).then(function (response) {
            var index = $scope.pins.indexOf(x => x.idPin == id);
            $scope.pins.splice(index, 1);
        });
    }
});