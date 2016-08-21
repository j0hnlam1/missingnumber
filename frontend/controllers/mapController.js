(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('mapController', mapController);

function mapController($scope, $routeParams, NgMap, mapFactory, userFactory, $location) {
    var mapCtrl = this;
    // initiates google map
    NgMap.getMap('map').then(function(map) {
        $scope.map = map;
    });
    //check if user is logged in
    userFactory.getUser(function(data) {
        console.log(data);
        if (data.name) {
            $scope.user = data;
        }
    })
    // allow: lets you add a tempory marker to map when true, markerType: 0 is pokemon, 1 is gyms,
    // 2 is pokestops, pokemon, gyms, pokestops: holds the data for all markers 
    // array used in filtering feature
    $scope.user = {};
    $scope.login = null;
    $scope.filteredpokemon = [];
    $scope.pokemon = [];
    $scope.gyms = [];
    $scope.pokestops = [];
    $scope.pokemons = [];
    $scope.pokeNames = ['Ash', 'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran-f', 'Nidorina', 'Nidoqueen', 'Nidoran-m', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetchd', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr-Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo'];
    $scope.markerType = 4;
    $scope.pokeId = 153;
    $scope.allow = false;
    $scope.showList = false;
    $scope.filterBool = false;
    $scope.showFilter = false;
    $scope.clickInstru = false;
    $scope.cancfirm = false;
    $scope.pokeInstru = false;
    $scope.clickable = true;
    $scope.searchbar = false;
    $scope.highlighted = 0;

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
    // images for pokemon... just images
    for (var i = 1; i < 151; i++) {
        $scope.pokemons.push({
            id: i,
            image: "../assets/images/pokemons/" + i + ".png"
        });
    }
    // for finding current location
    if (navigator.geolocation) {
        console.log("hello");
        // turn searchbar to turn only on map load
        $scope.searchbar = true;
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
            $scope.pokemon.unshift({
                pokeId: 0,
                icon: icon,
                title: "You're location",
                position: [position.coords.latitude, position.coords.longitude],
                confirmed: true,
                createdAt: n
            });
            $scope.ash = {
                pokeId: 0,
                icon: icon,
                title: "You're location",
                position: [position.coords.latitude, position.coords.longitude],
                confirmed: true,
                createdAt: n
            }
            $scope.$apply();
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
                createdAt: pokemons[i].createdAt,
                count: pokemons[i].votes.count
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
                createdAt: gyms[i].createdAt,
                count: gyms[i].votes.count
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
                createdAt: pokestops[i].createdAt,
                count: pokestops[i].votes.count
            });
        }
    });
    // function to let you add temporary markers to map
    $scope.allowMarker = function() {
        fuckyoukenny();
        if ($scope.login != null) {
            var allowTemp = $scope.allow;
            var clickInstruTemp = $scope.clickInstru;
            var pokeInstruTemp = $scope.pokeInstru;
            var showListTemp = $scope.showList;
            switchCancel();
            if (allowTemp == false) {
                $scope.allow = true;
            }
            if (clickInstruTemp == false) {
                $scope.clickInstru = true;
            }
            if (pokeInstruTemp == false) {
                $scope.pokeInstru = true;
            }
            if (showListTemp == false) {
                $scope.showList = true;
            }
        } else {
            console.log("notloggedin");
        }
    }
    // called when user picks the marker they want to place on the map
    $scope.selectPokemon = function(type, poke) {
        document.getElementsByClassName("add")[$scope.highlighted].style.background = "white";
        fuckyoukenny();
        $scope.clickable = false;
        $scope.markerType = type;
        if (type == 0) {
            $scope.pokeId = poke;
            $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokemons/'+ poke +'.png) 36 34, auto'});
            document.getElementsByClassName("add")[this.$index + 2].style.background = "blue";
            $scope.highlighted = this.$index + 2;
        }
        if (type == 1) {
            $scope.map.setOptions({draggableCursor: 'url(../assets/images/gym.png) 36 34, auto'});
            var x = document.getElementsByClassName("add")[0].style.background = "blue";
            $scope.highlighted = 0;
        }
        if (type == 2) {
            $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokestop.png) 36 34, auto'});
            var x = document.getElementsByClassName("add")[1].style.background = "blue";
            $scope.highlighted = 1;
        }
    }
    // adds temporary marker to map, parameters(event: lets you get the
    // clicked location coordinates, pokeId: pokemon id)
    $scope.addMarker = function(event) {
        fuckyoukenny();
        var tempId = $scope.pokeId;
        var tempType = $scope.markerType;
        switchCancel();
        $scope.markerType = tempType;
        $scope.pokeId = tempId;
        var d = new Date();
        var n = d.toISOString();
        var pos = [event.latLng.lat(), event.latLng.lng()]
        if ($scope.allow == true) {
            if ($scope.markerType != 4) {
                $scope.cancfirm = true;
                $scope.clickable = false;
                $scope.showList = true;
            }
            if ($scope.markerType == 0 && $scope.pokeId != 153) {
                $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokemons/'+ $scope.pokeId +'.png) 36 34, auto'});
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
                    type: "pokemon",
                    title: "New Marker",
                    position: pos,
                    confirmed: false,
                    createdAt: n,
                    count: 1
                });
            }
            if ($scope.markerType == 1) {
                $scope.map.setOptions({draggableCursor: 'url(../assets/images/gym.png) 36 34, auto'});
                $scope.gyms.push({
                    icon: gymIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false,
                    createdAt: n,
                    count: 1
                });
            }
            if ($scope.markerType == 2) {
                $scope.map.setOptions({draggableCursor: 'url(../assets/images/pokestop.png) 36 34, auto'});
                $scope.pokestops.push({
                    icon: pokestopIcon,
                    title: "New Marker",
                    position: pos,
                    confirmed: false,
                    createdAt: n,
                    count: 1
                });
            }
        }
    }
    // adds temporary markers to db making them permanent markers
    $scope.confirmMarker = function() {
        document.getElementsByClassName("add")[$scope.highlighted].style.background = "white";
        fuckyoukenny();
        if ($scope.markerType == 0) {
            var last = $scope.pokemon[$scope.pokemon.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newPokemon(last, $scope.user.email);
                }
            }
            last.confirmed = true;
        }
        if ($scope.markerType == 1) {
            var last = $scope.gyms[$scope.gyms.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newGym(last, $scope.user.email);
                }
            }
            last.confirmed = true;
        }
        if ($scope.markerType == 2) {
            var last = $scope.pokestops[$scope.pokestops.length - 1];
            if (last != undefined) {
                if (last.confirmed == false) {
                    mapFactory.newPokestop(last, $scope.user.email);
                }
            }
            last.confirmed = true;
        }
        $scope.cancfirm = false;
        $scope.pokeId = 153;
        $scope.map.setOptions({draggableCursor: 'default'});
        $scope.markerType = 4;

    }
    // disallows adding temporary markers to map and removes temporary markers
    $scope.cancelMarker = function() {
        document.getElementsByClassName("add")[$scope.highlighted].style.background = "white";
        fuckyoukenny();
        switchCancel();
        $scope.showList = true;
        $scope.clickInstru = true;
        $scope.pokeInstru = true;
    }
    //** end of "addmarker" logic and user interaction

    // when you click on a marker, we get data for infowindow and then display infowindow at marker location
    $scope.markerInfo = function(e, marker) {
        fuckyoukenny();
        if (marker.pokeId != 0){
            $scope.infoWindow = {createdAt: marker.createdAt, name: $scope.pokeNames[marker.pokeId], id: this.id, type: this.type, count: marker.count};
            $scope.map.showInfoWindow('foo-iw', this);
        }
    }
    // button in infowindow, deletes marker.. logic needs overhaul
    $scope.reportMarker = function(id, type, voteType) {
        fuckyoukenny();
        if ($scope.login != null) {
            if (type == "pokemon"){
                if (id > -1) {
                    var marker = $scope.pokemon[id];
                    mapFactory.addPokeVote(marker.position, $scope.user.email, voteType, function(newCount) {
                        var output = $scope.pokemon[id];
                        output.count = newCount.votes.count;
                        $scope.pokemon[id] = output;
                        $scope.infoWindow.count = newCount.votes.count;
                    });
                }
            }
            if (type == "gym") {
                if (id > -1) {
                    var marker = $scope.gyms[id];
                    mapFactory.addGymVote(marker.position, $scope.user.email, voteType, function(newCount) {
                        var output = $scope.gyms[id];
                        output.count = newCount.votes.count;
                        $scope.gyms[id] = output;
                        $scope.infoWindow.count = newCount.votes.count;
                    });
                }
            }
            if (type == "pokestop"){
                if (id > -1) {
                    var marker = $scope.pokestops[id];
                    mapFactory.addPokestopVote(marker.position, $scope.user.email, voteType, function(newCount) {
                        var output = $scope.pokestops[id];
                        output.count = newCount.votes.count;
                        $scope.pokestops[id] = output;
                        $scope.infoWindow.count = newCount.votes.count;
                    });
                }
            }
        }
    }
    // filter logic.. need kenny to explain
    $scope.toggleFilter = function() {
        var sfilter = $scope.showFilter;
        //$scope.showFilter = true
        var bfilter = $scope.filterBool;
        //$scope.filterBool = false
        switchCancel();
        if (sfilter == false) {
            $scope.showFilter = true;
        }
        if (bfilter == true) {
            $scope.filterBool = false;
            $scope.pokeFilter = 0;
        } else {
            $scope.filterBool = true;
            $scope.filteredpokemon.push($scope.ash);
        }
    }




    // same as above
    // $scope.toggle = true;
    $scope.filterPoke = function(poke) {
        // check if poke is in $scope.filteredpokemon array;
        if (containsPoke(poke, $scope.filteredpokemon)) {
            for (var i = 0; i < $scope.filteredpokemon.length; i++) {
                if (poke == $scope.filteredpokemon[i].pokeId) {
                    $scope.filteredpokemon.splice(i, 1);
                    i--;
                }
            }
        }
        // any poke that is in the $scope.pokemon array will be pushed to $scope.filteredpokemon array
        else {
            for (var i = 0; i < $scope.pokemon.length; i++) {
                // compares poke.id with $scope.pokemon and pushes into $scope.filteredpokemon if matached
                if (poke == $scope.pokemon[i].pokeId) {
                    $scope.filteredpokemon.push($scope.pokemon[i]);
                }
            }     
        }
        
        // if ( $scope.toggle ){
        //     document.getElementsByClassName("color")[this.$index].style.background = "blue";
        //     $scope.toggle = false;
        // } else {
        //     document.getElementsByClassName("color")[this.$index].style.background = "white";
        //     $scope.toggle = true;
        // }
    }







    // ditto
    function containsPoke(x, array) {
        for(var i = 0 ; i < array.length; i++) {
            if(array[i].pokeId == x) {
                return true;
            }
        }
        return false;
    }
    // test functions for development purposes only
    $scope.test = function() {
        console.log($scope.infoWindow);
    }
    function test() {
        console.log('yo');
    }
    // grabs login info from factory
    function fuckyoukenny() {
        userFactory.user(function(user, id) {
            $scope.login = id
            $scope.user = user[0];
            if (id == null) {
                switchCancel();
                $scope.allow = false;
            }
        })
    }
    // helper function that removes the temporary markers; used in numerous other functions
    // it sets the cursor image to default, makes markers clickable again, removes cancel and confirm buttons
    // removes both instructions, turns off filter, removes filter selection, removes the types of markers buttons
    // sets the markertype back to none of the 3, and the pokemon type for adding pokemon to the map back to nothing
    // in summary, resets every value back to default (same as how it was on page load) except $scope.allow. also removes unconfirmed markers
    function switchCancel() {
        $scope.map.setOptions({draggableCursor: 'default'});
        $scope.filteredpokemon = [];
        $scope.clickable = true;
        $scope.cancfirm = false;
        $scope.clickInstru = false;
        $scope.pokeInstru = false;
        $scope.filterBool = false;
        $scope.showFilter = false;
        $scope.showList = false;
        $scope.pokeId = 153;
        var last = $scope.pokemon[$scope.pokemon.length - 1];
        if (last != undefined) {
            if (last.confirmed == false) {
                $scope.pokemon.pop();
            }
        }
        var last = $scope.gyms[$scope.gyms.length - 1];
        if (last != undefined) {
            if (last.confirmed == false) {
                $scope.gyms.pop();
            }
        }
        var last = $scope.pokestops[$scope.pokestops.length - 1];
        if (last != undefined) {
            if (last.confirmed == false) {
                $scope.pokestops.pop();
            }
        }
        $scope.markerType = 4;
    }
    // was used in current location function. may need to be re added to that function
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh-PQkf7RLcF93okx8yhp59dhDe-vxwys&library=places,visualization";
}






    // deprecated code. should be saved somewhere else and removed from this page

    // $scope.heatShow = false;
    // $scope.heatType = 0;
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




})();

