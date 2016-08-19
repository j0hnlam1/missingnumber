myApp.factory('userFactory', function($http){
	var factory = {};
	var userInfo = {};
	var login = null;
	factory.login = function(user, id, callback){
		$http.post("/login", user).success(function(output) {
			userInfo = output;
			login = id;
			callback(output);
        })
	}
	factory.logout = function(callback) {
		userInfo = {};
		login = null;
		callback();
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