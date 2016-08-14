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

	factory.newPokemon = function(marker){
		$http.post("/newPokemon", marker).success(function(output) {
			console.log('success');
        })
	}

	factory.removePokemon = function(lat, lng){
		$http.get("/removePokemon/" + lat + "/"+ lng).success(function(output) {
			console.log('success');
        })
	}

	factory.findGym = function(callback){
		$http.get("/findGym").success(function(output){
			callback(output);
		})
	}

	factory.newGym = function(marker){
		$http.post("/newGym", marker).success(function(output) {
			console.log('success');
        })
	}

	factory.findPokestop = function(callback){
		$http.get("/findPokestop").success(function(output){
			callback(output);
		})
	}

	factory.newPokestop = function(marker){
		$http.post("/newPokestop", marker).success(function(output) {
			console.log('success');
        })
	}

	return factory;
});