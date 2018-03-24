﻿var myApp = angular.module("myApp", []);

var myApp = angular.module("myApp", ["isteven-multi-select"]);

myApp.controller('mapsController', function ($scope) {
    $scope.selectedTypes = [];
    $scope.types = [
    {name: "Opera", maker: "(Opera Software)", ticked: true }
    ];;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser00.");
    }

    var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
            '(last visited June 22, 2009).</p>' +
            '</div>' +
            '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
    function showPosition(position) {
        var myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 10
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!',
            icon: getMarkerImage("blue"),
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
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
});