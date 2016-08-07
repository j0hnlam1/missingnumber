var myApp = angular.module('Myapp', ["ngRoute"]);

(function(){
	myApp.config(function($routeProvider){

		$routeProvider
			.when('/', 
			{
				controller: 'userController',
				templateUrl: "partials/home.html"
			})
			.otherwise({
				redirectTo: "/"
			})
	})
}());