myApp.controller('mapController', function($scope, $routeParams, NgMap, mapFactory) {
    // initiates google map
    NgMap.getMap('map').then(function(map) {
        console.log('here');
    });
    // allow: lets you add a tempory marker to map when true, markerType: 0 is pokemon, 1 is gyms,
    // 2 is pokestops, pokemon, gyms, pokestops: holds the data for all markers 
    $scope.allow = false;
    $scope.report = false;
    $scope.markerType = 0;
    $scope.pokemon = [];
    $scope.gyms = [];
    $scope.pokestops = [];
    // icon for gym
    var gymImage = '../assets/gym.png';
    var gymIcon = {
        url: gymImage,
        size: [91, 91],
        origin: [0, 0],
        anchor: [17, 34],
        scaledSize: [50, 50]
    };
    // icon for pokestop
    var pokestopImage = '../assets/pokestop.png';
    var pokestopIcon = {
        url: pokestopImage,
        size: [91, 91],
        origin: [0, 0],
        anchor: [17, 34],
        scaledSize: [50, 50]
    };
    // for finding current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // current position coordinates
            $scope.pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            var icon = {
                url: '../assets/ash.png',
                size: [91,91],
                origin: [0, 0],
                anchor: [17, 34],
                scaledSize: [50, 50]
            }

            $scope.pokemon.push({
                pokeId: 0,
                icon: icon,
                title: "You're location",
                position: [position.coords.latitude, position.coords.longitude],
                confirmed: true
            });

        // }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
    }
    // db call for all pokemon
    mapFactory.findPokemon(function(pokemons) {
        for (var i = 0; i < pokemons.length; i++) {
            var pokemonIcon = {
                url: "http://pokeapi.co/media/sprites/pokemon/" + [pokemons[i].pokeId] + ".png",
                size: [91, 91],
                origin: [0, 0],
                anchor: [17, 34],
                scaledSize: [75, 75]
            };

            $scope.pokemon.push({
                pokeId: pokemons[i].pokeId,
                icon: pokemonIcon,
                title: "testCase",
                position: pokemons[i].position,
                confirmed: true
            });
        }
    });
    // db call for all gyms
    mapFactory.findGym(function(gyms) {
        for (var i = 0; i < gyms.length; i++) {
            $scope.gyms.push({
                icon: gymIcon,
                title: "testCase",
                position: gyms[i].position,
                confirmed: true
            });
        }
    });
    // db call for all pokestops
    mapFactory.findPokestop(function(pokestops) {
        for (var i = 0; i < pokestops.length; i++) {
            $scope.pokestops.push({
                pokeId: pokestops[i].pokeId,
                icon: pokestopIcon,
                title: "testCase",
                position: pokestops[i].position,
                confirmed: true
            });
        }
    });
    // adds temporary marker to map, parameters(event: lets you get the
    // clicked location coordinates, pokeId: pokemon id)
    $scope.addMarker = function(event, pokeId) {
        switchCancel();
        if ($scope.allow == true) {
            var pos = [event.latLng.lat(), event.latLng.lng()]
            if ($scope.markerType == 0) {
                var pokemonIcon = {
                    url: "http://pokeapi.co/media/sprites/pokemon/" + pokeId + ".png",
                    size: [91, 91],
                    origin: [0, 0],
                    anchor: [17, 34],
                    scaledSize: [75, 75]
                };

                $scope.pokemon.push({
                    pokeId: pokeId,
                    icon: pokemonIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false
                });
            }
            if ($scope.markerType == 1) {
                $scope.gyms.push({
                    pokeId: pokeId,
                    icon: gymIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false
                });
            }
            if ($scope.markerType == 2) {
                $scope.pokestops.push({
                    pokeId: pokeId,
                    icon: pokestopIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false
                });
            }
        }
    }
    // adds temporary markers to db making them permanent markers
    $scope.confirmMarker = function() {
        if ($scope.markerType == 0) {
            var last = $scope.pokemon[$scope.pokemon.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newPokemon(last);
                }
            }
            last.confirmed = true;
            $scope.allow = false;
        }
        if ($scope.markerType == 1) {
            var last = $scope.gyms[$scope.gyms.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newGym(last);
                }
            }
            last.confirmed = true;
            $scope.allow = false;
        }
        if ($scope.markerType == 2) {
            var last = $scope.pokestops[$scope.pokestops.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newPokestop(last);
                }
            }
            last.confirmed = true;
            $scope.allow = false;
            $scope.report = false;
        }
    }
    // function to let you add temporary markers to map
    $scope.allowMarker = function() {
        $scope.allow = true;
        $scope.report = false;
    }
    // disallows adding temporary markers to map and removes temporary markers
    $scope.cancelMarker = function() {
        switchCancel();
        $scope.allow = false;
        $scope.report = false;
    }
    // switches markerType to the whichever parameter is inputted and removes temporary markers
    $scope.switchMarker = function(type) {
        switchCancel();
        $scope.markerType = type;
        $scope.allow = false;
        $scope.report = false;
    }
    $scope.allowReport = function() {
        switchCancel();
        $scope.allow = false;
        $scope.report = true;
    }
    $scope.reportMarker = function() {
        if (this.confirmed == true && $scope.report == true) {
            if (this.type == "pokemon"){
                if (this.id > -1) {
                    $scope.pokemon.splice(this.id, 1);
                    mapFactory.removePokemon(this.position.lat(), this.position.lng());
                }
            }
            if (this.type == "gym"){
                if (this.id > -1) {
                    $scope.gyms.splice(this.id, 1);
                }
            }
            if (this.type == "pokestop"){
                if (this.id > -1) {
                    $scope.pokestops.splice(this.id, 1);
                }
            }
        }
    }
    // helper function that removes the temporary markers; used in numerous other functions
    function switchCancel() {
        if ($scope.markerType == 0) {
            var last = $scope.pokemon[$scope.pokemon.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    $scope.pokemon.pop();
                }
            }
        }
        if ($scope.markerType == 1) {
            var last = $scope.gyms[$scope.gyms.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    $scope.gyms.pop();
                }
            }
        }
        if ($scope.markerType == 2) {
            var last = $scope.pokestops[$scope.pokestops.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    $scope.pokestops.pop();
                }
            }
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
      }

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys";

});




