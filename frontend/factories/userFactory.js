myApp.factory('userFactory', function($http){
	var factory = {};
	factory.login = function(user, callback){
		$http.post("/login", user).success(function(output) {
			callback(output);
        })
	}
	return factory;
})