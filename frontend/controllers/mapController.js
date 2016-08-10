
// myApp.controller('mapController', function($scope, $routeParams) {

    

//     function initAutocomplete(){
//         var map = new google.maps.Map(document.getElementById('map'), {
//             center: {lat: -33.8688, lng: 151.2195},
//             zoom: 13,
//             mapTypeId: 'roadmap'
//         });

//         var markers = [];

//         var image = '../assets/pikachu.png';

//         var icon = {
//                 url: image,
//                 size: new google.maps.Size(91, 91),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(50, 50)
//             };

//         markers.push(new google.maps.Marker({
//                 map: map,
//                 icon: icon,
//                 title: "testCase",
//                 position: {lat: 37.5482697, lng: -121.98857190000001}
//             }));


//         var infoWindow = new google.maps.InfoWindow({map: map});

//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 var pos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//                 var image = '../assets/ash.png';

// (function(){
//     'use strict';
//     angular
//     .module('Myapp')
//     .controller('mapController', mapController);


//     function mapController($scope, $routeParams){
//         console.log('here');

//         $scope.initAutocomplete = function(){
//             console.log('chip');
//             var map = new google.maps.Map(document.getElementById('map'), {
//                 center: {lat: -33.8688, lng: 151.2195},
//                 zoom: 13,
//                 mapTypeId: 'roadmap'
//             });


//             var markers = [];
//             var image = '../assets/pikachu.png';

//             var icon = {
//                     url: image,
//                     size: new google.maps.Size(91, 91),
//                     origin: new google.maps.Point(0, 0),
//                     anchor: new google.maps.Point(17, 34),
//                     scaledSize: new google.maps.Size(50, 50)
//             };

//             markers.push(new google.maps.Marker({
//                     map: map,
//                     icon: icon,
//                     title: "testCase",
//                     position: {lat: 37.5482697, lng: -121.98857190000001}
//             }));


//             var infoWindow = new google.maps.InfoWindow({map: map});

//             // Try HTML5 geolocation.
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(function(position) {
//                     var pos = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude
//                     };
//                     var image = '../assets/ash.png';

//                     infoWindow.setPosition(pos);
//                     infoWindow.setContent('Ash is here.');
//                     map.setCenter(pos);

//                     var icon = {
//                         url: image,
//                         size: new google.maps.Size(91, 91),
//                         origin: new google.maps.Point(0, 0),
//                         anchor: new google.maps.Point(17, 34),
//                         scaledSize: new google.maps.Size(50, 50)
//                     };

//                     markers.push(new google.maps.Marker({
//                         map: map,
//                         icon: icon,
//                         title: "Ash",
//                         position: pos
//                     }));

//                 }, function() {
//                     handleLocationError(true, infoWindow, map.getCenter());
//                 });
//             } else {
//                 // Browser doesn't support Geolocation
//                 handleLocationError(false, infoWindow, map.getCenter());
//             }

//             // Create the search box and link it to the UI element.
//             var input = document.getElementById('pac-input');
//             var searchBox = new google.maps.places.SearchBox(input);
//             map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//             // Bias the SearchBox results towards current map's viewport.
//             map.addListener('bounds_changed', function() {
//                 searchBox.setBounds(map.getBounds());
//             });

            
//             // Listen for the event fired when the user selects a prediction and retrieve
//             // more details for that place.
//             searchBox.addListener('places_changed', function() {
//                 var places = searchBox.getPlaces();
//                 console.log(places);
//                 console.log(places[0].geometry.location.lat());
//                 console.log(places[0].geometry.location.lng());
//                 if (places.length == 0) {
//                     return;
//                 }

//                 // Clear out the old markers.
//                 markers.forEach(function(marker) {
//                     marker.setMap(null);
//                 });
//                 markers = [];

//                 // For each place, get the icon, name and location.
//                 var bounds = new google.maps.LatLngBounds();
//                 places.forEach(function(place) {

//                     var image = '../assets/pikachu.png';
//                     if (!place.geometry) {
//                         console.log("Returned place contains no geometry");
//                         return;
//                     }
//                     var icon = {
//                         url: image,
//                         size: new google.maps.Size(91, 91),
//                         origin: new google.maps.Point(0, 0),
//                         anchor: new google.maps.Point(17, 34),
//                         scaledSize: new google.maps.Size(50, 50)
//                     };

//                     // Create a marker for each place.
//                     markers.push(new google.maps.Marker({
//                         map: map,
//                         icon: icon,
//                         title: place.name,
//                         position: place.geometry.location
//                     }));

//                     if (place.geometry.viewport) {
//                         // Only geocodes have viewport.
//                         bounds.union(place.geometry.viewport);
//                     } else {
//                         bounds.extend(place.geometry.location);
//                     }
//                 });
//             map.fitBounds(bounds);
//             });
//         };

//         $scope.init = function () {
//             console.log('what');
//             var script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys&libraries=places&callback=initAutocomplete';
//             document.body.appendChild(script);
//         };

//         function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//             infoWindow.setPosition(pos);
//             infoWindow.setContent(browserHasGeolocation ?
//                                   'Error: The Geolocation service failed.' :
//                                   'Error: Your browser doesn\'t support geolocation.');
//         };
        
//     }

//     window.addEventListener('load',function(){

//         var script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys&libraries=places&callback=initAutocomplete';
//         document.body.appendChild(script);
//     });
// })

// })();

myApp.controller('mapController', function($scope, $routeParams, NgMap) {

    NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys";

});




