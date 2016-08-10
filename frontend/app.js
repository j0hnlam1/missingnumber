var myApp = angular.module('Myapp', ["ngRoute", "ngMap"]);

(function(){
	myApp.config(function($routeProvider){

		$routeProvider
			.when('/', 
			{
				controller: 'mapController',
				templateUrl: "partials/home.html"
			})
			.otherwise({
				redirectTo: "/"
			})
	})
}());

