var myApp = angular.module('Myapp', ["ngRoute"]);

(function(){
	myApp.config(function($routeProvider){

		$routeProvider
			.when('/', 
			{
				templateUrl: "partials/home.html"
			})
			.otherwise({
				redirectTo: "/"
			})
	})
}());