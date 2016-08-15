myApp.controller('mapController', function($scope, $routeParams, NgMap, mapFactory) {
    // initiates google map
    var heatmap;
    NgMap.getMap('map').then(function(map) {
        $scope.map = map;
        heatmap = $scope.map.heatmapLayers.foo;
        console.log(heatmap);
    });
    
    // allow: lets you add a tempory marker to map when true, markerType: 0 is pokemon, 1 is gyms,
    // 2 is pokestops, pokemon, gyms, pokestops: holds the data for all markers 
    $scope.allow = false;
    $scope.report = false;
    $scope.hide = true;
    $scope.show = false;
    $scope.heatShow = false;
    $scope.markerType = 0;
    $scope.pokemon = [];
    $scope.gyms = [];
    $scope.pokestops = [];
    $scope.pokemons = [];
    $scope.pokeId = 1;
    $scope.heatData = [];
    $scope.heatType = 0;
    // icon for gym
    var gymImage = '../assets/images/gym.png';
    var gymIcon = {
        url: gymImage,
        size: [91, 91],
        origin: [0, 0],
        anchor: [17, 34],
        scaledSize: [50, 50]
    };
    // icon for pokestop
    var pokestopImage = '../assets/images/pokestop.png';
    var pokestopIcon = {
        url: pokestopImage,
        size: [91, 91],
        origin: [0, 0],
        anchor: [17, 34],
        scaledSize: [50, 50]
    };
    
    for (var i = 1; i < 151; i++) {
        $scope.pokemons.push({
            id: i,
            image: "../assets/images/pokemons/" + i + ".png"
        });
    }
    // for finding current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            // current position coordinates
            $scope.pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log($scope.pos);
            var icon = {
                url: '../assets/images/ash.png',
                size: [91,91],
                origin: [0, 0],
                anchor: [17, 34],
                scaledSize: [50, 50]
            };

            $scope.pokemon.push({
                pokeId: 0,
                icon: icon,
                title: "You're location",
                position: [position.coords.latitude, position.coords.longitude],
                confirmed: true
            });
        });
    }

    // db call for all pokemon
    mapFactory.findPokemon(function(pokemons) {
        for (var i = 1; i < pokemons.length; i++) {
            var pokemonIcon = {
                url: "../assets/images/pokemons/" + pokemons[i].pokeId + ".png",
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
                icon: pokestopIcon,
                title: "testCase",
                position: pokestops[i].position,
                confirmed: true
            });
        }
    });
    // adds temporary marker to map, parameters(event: lets you get the
    // clicked location coordinates, pokeId: pokemon id)
    $scope.addMarker = function(event) {
        switchCancel();
        if ($scope.allow == true) {
            var pos = [event.latLng.lat(), event.latLng.lng()]
            if ($scope.markerType == 0) {
                $scope.hide = false;
                $scope.show = true;
                var pokemonIcon = {
                    url: "../assets/images/pokemons/" + $scope.pokeId + ".png",
                    size: [91, 91],
                    origin: [0, 0],
                    anchor: [17, 34],
                    scaledSize: [75, 75]
                };

                $scope.pokemon.push({
                    pokeId: $scope.pokeId,
                    icon: pokemonIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false
                });
            }
            if ($scope.markerType == 1) {
                $scope.gyms.push({
                    icon: gymIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false
                });
            }
            if ($scope.markerType == 2) {
                $scope.pokestops.push({
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
            $scope.hide = true;
            $scope.show = false;
        }
    }
    // function to let you add temporary markers to map
    $scope.allowMarker = function() {
        $scope.allow = true;
        $scope.report = false;
        $scope.heatShow = false;
        if ($scope.markerType == 0) {
            $scope.hide = false;
            $scope.show = true;
        }
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
        $scope.hide = true;
        $scope.show = false;
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
    $scope.selectPokemon = function(poke) {
        $scope.pokeId = poke;
    }
    $scope.toggleHeatMap = function(poke) {
        if ($scope.heatData.length < 1) {
            $scope.heatType = poke;
            for (var i = 0; i < $scope.pokemon.length; i++) {
                if ($scope.pokemon[i].pokeId == poke) {
                    var data = new google.maps.LatLng($scope.pokemon[i].position[0], $scope.pokemon[i].position[1]);
                    $scope.heatData.push(data);
                }
            }
        } else {
            if (poke != $scope.heatType) {
                $scope.heatData.length = 0;
                for (var i = 0; i < $scope.pokemon.length; i++) {
                    if ($scope.pokemon[i].pokeId == poke) {
                        var data = new google.maps.LatLng($scope.pokemon[i].position[0], $scope.pokemon[i].position[1]);
                        $scope.heatData.push(data);
                    }
                }
            }
        }
        heatmap.setMap(heatmap.getMap());
        
    }
    $scope.toggleHeatPoke = function() {
        if ($scope.heatShow == true){
            $scope.heatShow = false;
        } else {
            $scope.heatShow = true;
        }
    }
    $scope.heatOff = function() {
        switchCancel();
        $scope.heatData.length = 0;
        heatmap.setMap(heatmap.getMap());
    }
    // helper function that removes the temporary markers; used in numerous other functions
    function switchCancel() {
        $scope.hide = true;
        $scope.show = false;
        $scope.heatShow = false;
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

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys&library=places,visualization";

});