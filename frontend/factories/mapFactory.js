myApp.factory('mapFactory', function($http) {
	var factory = {};

	factory.index = function(){
		console.log("in mapFactory");
	}

	factory.findPokemon = function(callback){
		$http.get("/findPokemon").success(function(output){
			callback(output);
		})
	}

	factory.newPokemon = function(marker, user){
		var info = {pokeId: marker.pokeId, position: marker.position, user: user};
		$http.post("/newPokemon", info).success(function() {
			console.log('success');
        })
	}

	factory.removePokemon = function(lat, lng){
		$http.get("/removePokemon/" + lat + "/"+ lng).success(function() {
			console.log('success');
        })
	}

	factory.findGym = function(callback){
		$http.get("/findGym").success(function(output){
			callback(output);
		})
	}

	factory.newGym = function(marker, user){
		var info = {position: marker.position, user: user};
		$http.post("/newGym", info).success(function() {
			console.log('success');
        })
	}

	factory.removeGym = function(lat, lng){
		$http.get("/removeGym/" + lat + "/"+ lng).success(function() {
			console.log('success');
        })
	}

	factory.findPokestop = function(callback){
		$http.get("/findPokestop").success(function(output){
			callback(output);
		})
	}

	factory.newPokestop = function(marker, user) {
		var info = {position: marker.position, user: user};
		$http.post("/newPokestop", info).success(function() {
			console.log('success');
        })
	}

	factory.removePokestop = function(lat, lng) {
		console.log(lat);
		$http.get("/removePokestop/" + lat + "/"+ lng).success(function() {
			console.log('success');
        })
	}

	factory.addPokeVote = function(pos, user, type, callback) {
		var info = {lat: pos[0], lng: pos[1], user: user, type: type};
		$http.post("/addPokeVote", info).success(function(output) {
			callback(output);
		})
	}
	factory.addGymVote = function(pos, user, type, callback) {
		var info = {lat: pos[0], lng: pos[1], user: user, type: type};
		$http.post("/addGymVote", info).success(function(output) {
			callback(output);
		})
	}
	factory.addPokestopVote = function(pos, user, type, callback) {
		var info = {lat: pos[0], lng: pos[1], user: user, type: type};
		$http.post("/addPokestopVote", info).success(function(output) {
			callback(output);
		})
	}

	return factory;
});