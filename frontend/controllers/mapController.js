myApp.controller('mapController', function($scope, $routeParams, NgMap, mapFactory, $location) {
    // initiates google map
    var heatmap;
    NgMap.getMap('map').then(function(map) {
        $scope.map = map;
        heatmap = $scope.map.heatmapLayers.foo;
        
    });
    
    // allow: lets you add a tempory marker to map when true, markerType: 0 is pokemon, 1 is gyms,
    // 2 is pokestops, pokemon, gyms, pokestops: holds the data for all markers 
    $scope.heatData = [];
    $scope.pokemon = [];
    $scope.gyms = [];
    $scope.pokestops = [];
    $scope.pokemons = [];
    $scope.pokeNames = ['ash', 'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo'];
    $scope.pokeFilter = 0;

    $scope.markerType = 4;
    $scope.pokeId = 153;
    $scope.allow = false;
    $scope.showList = false;
    $scope.filterBool = false;
    $scope.showFilter = false;
    $scope.showTypes = false;
    $scope.clickInstru = false;
    $scope.cancfirm = false;
    $scope.pokeInstru = false;
    $scope.clickable = true;

    $scope.heatShow = false;
    $scope.heatType = 0;
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var n = d.toISOString();
    $scope.currentDate = n;

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
            var d = new Date();
            var n = d.toISOString();
            // current position coordinates
            $scope.pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
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
                confirmed: true,
                createdAt: n
            });
            $scope.$apply()
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
                type: "pokemon",
                icon: pokemonIcon,
                title: "testCase",
                position: pokemons[i].position,
                confirmed: true,
                createdAt: pokemons[i].createdAt
            });             
        }
    });
    // db call for all gyms
    mapFactory.findGym(function(gyms) {
        for (var i = 0; i < gyms.length; i++) {
            $scope.gyms.push({
                type: "gym",
                icon: gymIcon,
                title: "testCase",
                position: gyms[i].position,
                confirmed: true,
                createdAt: gyms[i].createdAt
            });
        }
    });
    // db call for all pokestops
    mapFactory.findPokestop(function(pokestops) {
        for (var i = 0; i < pokestops.length; i++) {
            $scope.pokestops.push({
                type: "pokestop",
                icon: pokestopIcon,
                title: "testCase",
                position: pokestops[i].position,
                confirmed: true,
                createdAt: pokestops[i].createdAt
            });
        }
    });
    // adds temporary marker to map, parameters(event: lets you get the
    // clicked location coordinates, pokeId: pokemon id)
    $scope.addMarker = function(event) {

        var tempId = $scope.pokeId;
        var tempType = $scope.markerType;
        switchCancel();
        $scope.markerType = tempType;
        $scope.pokeId = tempId;
        console.log($scope.markerType);

        var d = new Date();
        var n = d.toISOString();
        var pos = [event.latLng.lat(), event.latLng.lng()]
        if ($scope.allow == true) {
            if ($scope.markerType != 4) {
                $scope.cancfirm = true;
                $scope.clickable = false;
                            }
            if ($scope.markerType == 0 && $scope.pokeId != 153) {
                $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokemons/'+ $scope.pokeId +'.png) 36 34, auto'});
                $scope.showList = true;
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
                    confirmed: false,
                    createdAt: n
                });
            }
            if ($scope.markerType == 1) {
                console.log('here');
                $scope.gyms.push({
                    icon: gymIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false,
                    createdAt: n
                });
            }
            if ($scope.markerType == 2) {
                $scope.pokestops.push({
                    icon: pokestopIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false,
                    createdAt: n
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
        }
        if ($scope.markerType == 1) {
            var last = $scope.gyms[$scope.gyms.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newGym(last);
                }
            }
            last.confirmed = true;
        }
        if ($scope.markerType == 2) {
            var last = $scope.pokestops[$scope.pokestops.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newPokestop(last);
                }
            }
            last.confirmed = true;
        }
        $scope.allow = false;
        switchCancel();
    }
    // function to let you add temporary markers to map
    $scope.allowMarker = function() {
        switchCancel();
        $scope.allow = true;
        $scope.showTypes = true;
        
    }
    // disallows adding temporary markers to map and removes temporary markers
    $scope.cancelMarker = function() {
        switchCancel();
        $scope.allow = false;
    }
    // switches markerType to the whichever parameter is inputted and removes temporary markers
    $scope.switchMarker = function(type) {
        switchCancel();
        $scope.clickInstru = true;
        $scope.markerType = type;
        // $scope.allow = false;
        if ($scope.markerType == 0) {
            $scope.showList = true;
            $scope.pokeInstru = true;
        }
    }
    $scope.markerInfo = function(e, marker) {
        $scope.infoWindow = {createdAt: marker.createdAt, name: $scope.pokeNames[marker.pokeId], id: this.id};
        $scope.map.showInfoWindow('foo-iw', this);   
    }
    $scope.reportMarker = function(id) {
        var marker = $scope.pokemon[id];
        if (marker.type == "pokemon"){
            console.log('here');
            if (id > -1) {
                console.log(id);
                $scope.pokemon.splice(id, 1);
                mapFactory.removePokemon(marker.position[0], marker.position[1]);
            }
        }
        if (marker.type == "gym") {
            if (id > -1) {
                $scope.gyms.splice(marker.id, 1);
            }
        }
        if (marker.type == "pokestop"){
            if (id > -1) {
                $scope.pokestops.splice(marker.id, 1);
            }
        }
    }
    $scope.selectPokemon = function(poke) {
        $scope.pokeId = poke;
        $scope.clickable = false;
        $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokemons/'+ poke +'.png) 36 34, auto'});
    }
    // $scope.toggleHeatMap = function(poke) {
    //     if ($scope.heatData.length < 1) {
    //         $scope.heatType = poke;
    //         for (var i = 0; i < $scope.pokemon.length; i++) {
    //             if ($scope.pokemon[i].pokeId == poke) {
    //                 var data = new google.maps.LatLng($scope.pokemon[i].position[0], $scope.pokemon[i].position[1]);
    //                 $scope.heatData.push(data);
    //             }
    //         }
    //     } else {
    //         if (poke != $scope.heatType) {
    //             $scope.heatData.length = 0;
    //             $scope.heatType = poke;
    //             for (var i = 0; i < $scope.pokemon.length; i++) {
    //                 if ($scope.pokemon[i].pokeId == poke) {
    //                     var data = new google.maps.LatLng($scope.pokemon[i].position[0], $scope.pokemon[i].position[1]);
    //                     $scope.heatData.push(data);
    //                 }
    //             }
    //         }
    //     }
    //     heatmap.setMap(heatmap.getMap());
        
    // }
    // $scope.toggleHeatPoke = function() {
    //     switchCancel();
    //     $scope.allow = false;
    //     if ($scope.heatShow == true){
    //         $scope.heatShow = false;
    //     } else {
    //         $scope.heatShow = true;
    //     }
    // }
    // $scope.heatOff = function() {
    //     switchCancel();
    //     $scope.allow = false;
    //     $scope.heatData.length = 0;
    //     heatmap.setMap(heatmap.getMap());
    // }
    $scope.toggleFilter = function() {
        var sfilter = $scope.showFilter;
        var bfilter = $scope.filterBool;
        switchCancel();
        if (sfilter == false) {
            $scope.showFilter = true;
        }
        if (bfilter == true) {
            $scope.filterBool = false;
            $scope.pokeFilter = 0;
        } else {
            $scope.filterBool = true;
        }
    }
    $scope.filterPoke = function(poke) {
        $scope.pokeFilter = poke;
    }
    $scope.test = function() {
        console.log($scope.text);
    }
    function testl() {
       console.log('here');
    }
    // helper function that removes the temporary markers; used in numerous other functions
    // it sets the cursor to default, makes markers clickable again, removes cancel and confrim buttons
    // removes both instructions, turns off filter, removes filter selection, removes the types of markers buttons

    function switchCancel() {
        $scope.map.setOptions({draggableCursor: 'default'});
        $scope.clickable = true;
        $scope.cancfirm = false;
        $scope.clickInstru = false;
        $scope.pokeInstru = false;
        $scope.filterBool = false;
        $scope.showFilter = false;
        $scope.showTypes = false;
        $scope.showList = false;
        $scope.pokeId = 153;

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
        $scope.markerType = 4;
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
      }

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys&library=places,visualization";


/************SEARCH BAR FOR POKEMON**********/
// function DemoCtrl ($timeout, $q, $log) {
//     var self = this;

    // $scope.simulateQuery = false;
    // $scope.isDisabled    = false;

//     // list of `state` value/display objects
    // $scope.states        = loadAll();
    // console.log($scope.states);
    // $scope.querySearch   = querySearch;
    // $scope.selectedItemChange = selectedItemChange;
    // $scope.searchTextChange   = searchTextChange;

//     self.newState = newState;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    // function querySearch (query) {
    //   var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
    //       deferred;
    //   if ($scope.simulateQuery) {
    //     deferred = $q.defer();
    //     $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
    //     return deferred.promise;
    //   } else {
    //     return results;
    //   }
    // }

    // function searchTextChange(text) {
    //   $log.info('Text changed to ' + text);
    // }

    // function selectedItemChange(item) {
    //   $log.info('Item changed to ' + JSON.stringify(item));
    // }

    /**
     * Build `states` list of key/value pairs
     */
    // function loadAll() {
    //   var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //           Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //           Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //           Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //           North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //           South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //           Wisconsin, Wyoming';

    //   return allStates.split(/, +/g).map( function (state) {
    //     return {
    //       value: state.toLowerCase(),
    //       display: state
    //     };
    //   });
    // }

    /**
     * Create filter function for a query string
     */
    // function createFilterFor(query) {
    //   var lowercaseQuery = angular.lowercase(query);

    //   return function filterFn(state) {
    //     return (state.value.indexOf(lowercaseQuery) === 0);
    //   };

    // }
  // }

/***************** END OF SERACH BAR *******************/


/*********************** navbar ***********************/
$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
/********************** end of navbar *****************/

});