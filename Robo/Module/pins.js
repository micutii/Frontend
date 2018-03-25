myApp.controller('pinsController', ["$scope", "$rootScope", "requests", function ($scope, $rootScope, requests) {
    $scope.types = [];

    $scope.approvePin = function (id) {
        requests.approvePin(id).then(function (response) {
            $scope.pins.find(x => x.idPin == id).state = 1;
        });
    }

    $scope.deletePin = function (id) {
        requests.deletePin(id).then(function (response) {
            var index = $scope.pins.findIndex(x => x.idPin == id);
            $scope.pins.splice(index, 1);
        });
    }

    requests.types().then(function (response) {
        response.data.forEach(function (type) {
            $scope.types.push({ name: type.typeName, id: type.idType, color: type.color, ticked: false });
        })
        requests.allPins().then(function (response) {
            $scope.pins = response.data;
            $scope.pins.forEach(function (pin) {
                pin.type = $scope.types.find(x => x.id == pin.idType).name;
            });
        });
    });
}]);