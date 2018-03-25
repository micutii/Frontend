myApp.controller('mapsController', ["$scope", "$rootScope", "requests", function ($scope, $rootScope, requests) {
    $scope.selectedTypes = [];
    $scope.types = [];
    $scope.pinTypes = [];
    $scope.showAddPin = false;
    $scope.showSlider = false;
    $scope.getNumber = function (nr) {
        var arr = [];
        for (var i = 0; i < nr; ++i)
            arr.push(i);
        return arr;
    }


    var map = {};
    var infowindows = [];
    $scope.pinRequest = {};
    $scope.markers = [];

    $scope.toggleAddPin = function () {
        $scope.showAddPin = !$scope.showAddPin;
    };

    $scope.$watchCollection('selectedTypes', function () {
        removeMarkers();
        refreshPins();
        addPins();
    });

    $scope.$watch('pins', function () {
        removeMarkers();
        refreshPins();
        addPins();
    });

    $scope.addPin = function () {
        console.log($scope.pinRequest);
        let pin = {
            "address": $scope.pinRequest.address,
            "latitude": $scope.pinRequest.latitude,
            "longitude": $scope.pinRequest.longitude,
            "idType": $scope.pinRequest.type[0].id,
            "contact": $scope.pinRequest.contact,
            "description": $scope.pinRequest.description,
            "percentage": $scope.pinRequest.womenNumber / $scope.pinRequest.membersNumber *100,
            "name": $scope.pinRequest.name,
            "projForWomen": $scope.pinRequest.womenProjects,
            "benefitsForWomen": $scope.pinRequest.womenBenefits,
            "members": $scope.pinRequest.membersNumber
        };
        $scope.pinRequest.address = "";
        $scope.pinRequest.latitude = "";
        $scope.pinRequest.longitude = "";
        $scope.pinRequest.contact = "";
        $scope.pinRequest.description = "";
        $scope.pinRequest.womenNumber = "";
        $scope.pinRequest.membersNumber = "";
        $scope.pinRequest.name = "";
        $scope.pinRequest.womenProjects = "";
        $scope.pinRequest.womenBenefits = "";
        requests.addPin(pin);
    }

    $scope.enableAddPin = function() {
        return !(!!$scope.pinRequest.address && !!$scope.pinRequest.latitude &&
        !!$scope.pinRequest.longitude && $scope.pinRequest.type.length > 0 &&
        !!$scope.pinRequest.contact && !!$scope.pinRequest.description &&
        !!$scope.pinRequest.womenNumber &&
        !!$scope.pinRequest.membersNumber && !!$scope.pinRequest.name &&
        !!$scope.pinRequest.womenProjects && !!$scope.pinRequest.womenBenefits);
    }

    function removeMarkers() {
        $scope.markers.forEach(function (marker) {
            marker.setMap(null);
        });
        $scope.markers = [];
    }

    function refreshPins() {
        if ($scope.selectedTypes && $scope.selectedTypes.length > 0) {
            $scope.filteredPins = [];
            $scope.pins.forEach(function (pin) {
                if ($scope.selectedTypes.findIndex(x => x.id == pin.idType) > -1)
                    $scope.filteredPins.push(pin);
            })
        }
        else {
            $scope.filteredPins = angular.copy($scope.pins);
        }
    }

    function displayMap() {
        if (navigator.geolocation && false) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            let position = {};
            position.coords = {};
            position.coords.latitude = 44.4377401;
            position.coords.longitude = 25.9545541;
            showPosition(position);
        }
    }

    function addPins() {
        if ($scope.filteredPins && $scope.filteredPins.length > 0) {
            for (i = 0; i < $scope.filteredPins.length; i++) {
                let pin = $scope.filteredPins[i];
                let myLatLng = { lat: pin.latitude, lng: pin.longitude };
                pinContent = '<div class="popup"><h3 class="name">' +
                    pin.name + '</h3><p class="title">' + pin.type +
                    '</p><div class="address">' + pin.address +
                    '</div><div class="contact">' + pin.contact +
                    '</div><p class="title description">' + pin.description +
                    '</p></div>';
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: pin.name,
                    icon: getMarkerImage($scope.types.find(x => x.id == pin.idType).color),
                });

                infowindows.push(new google.maps.InfoWindow({ content: pinContent }));
                $scope.markers.push(marker);

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.pin = $scope.filteredPins[i];
                                requests.getReviews($scope.pin.idPin).then(function (response) {
                                    $scope.pin.reviews = response.data;
                                    console.log($scope.pin.reviews);
                                }, function (err) {
                                    $scope.pin.reviews = [];
                                });
                                $scope.showSlider = true;
                            });
                        }, 100);
                    }
                })(marker, i));
            };
        }
    }
    
    function showPosition(position) {
        var myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 7
        });

        //addPins();
    }


    var icons = new Array();
    icons["red"] = {
        url: "http://labs.google.com/ridefinder/images/mm_20_red.png",
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(24, 40),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(12, 40)
    };

    // options:"red", "blue", "green", "yellow", "orange"
    function getMarkerImage(iconColor) {
        if ((typeof (iconColor) == "undefined") || (iconColor == null)) {
            iconColor = "red";
        }
        if (!icons[iconColor]) {
            icons[iconColor] = {
                url: "http://labs.google.com/ridefinder/images/mm_20_" + iconColor + ".png",
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(12, 20),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(6, 20)
            };
        }
        return icons[iconColor];
    }

    //requests.pins().then(function (response) {
    //    $scope.pins = response.data;
    //    displayMap();
    //});

    requests.types().then(function (response) {
        response.data.forEach(function (type) {
            $scope.types.push({ name: type.typeName, id: type.idType, color: type.color, ticked: false });
            $scope.pinTypes.push({ name: type.typeName, id: type.idType, color: type.color, ticked: false });
        })
        requests.pins().then(function (response) {
            $scope.pins = response.data;
            displayMap();
        });
    });
}]);
