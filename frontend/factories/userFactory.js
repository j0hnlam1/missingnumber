myApp.factory('userFactory', function($http){
	var factory = {};
	var userInfo = {};
	var login = null;

	// for chatroom
	var currentusers = [];

	factory.login = function(user, id, callback){
		$http.post("/login", user).success(function(output) {
			userInfo = output;
			// console.log("logging user", userInfo);
			currentusers.push(userInfo[0]);
			login = id;
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

	//get all logged in users
	factory.getAllUsers = function(callback){
		callback(currentusers);
	}
	return factory;
})