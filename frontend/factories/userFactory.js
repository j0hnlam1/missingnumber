myApp.factory('userFactory', function($http){
	var factory = {};
	var userInfo = {};
	var login = null;
	// var socket = io.connect();
	factory.socketInfo = function(callback) {
		callback(socket);
	}  

	factory.login = function(user, id, callback){
		$http.post("/login", user).success(function(output) {
			userInfo = output;
			login = id;
			socket.emit("info", userInfo);
			callback(output);
        })
	}
	factory.logout = function() {
		userInfo = {};
		login = null;
	}
	factory.user = function(callback) {
		callback(userInfo, login);
	}

	//check to see if user is logged in
	factory.getUser = function(callback){
		callback(userInfo);
	}

	return factory;
})