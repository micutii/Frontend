myApp.controller('pinsController', function ($scope, requests) {
    requests.allPins().then(function (response) {
        $scope.pins = response.data;
    });

    $scope.approvePin = function (id) {
        requests.approvePin(id).then(function (response) {
            $scope.pins.find(x => x.idPin == id).state = 1;
        });
    }

    $scope.deletePin = function (id) {
        requests.deletePin(id).then(function (response) {
            var index = $scope.pins.indexOf(x => x.idPin == id);
            $scope.pins.splice(index, 1);
        });
    }
});