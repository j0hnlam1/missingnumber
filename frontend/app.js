var myApp = angular.module('Myapp', ["ngRoute", "ngMap", "ngMapAutocomplete"]);

(function(){
	myApp.config(function($routeProvider, $locationProvider){

		$routeProvider
			.when('/', 
			{
				controller: 'mapController',
				templateUrl: "partials/home.html"
			})
			.otherwise({
				redirectTo: "/"
			});

		$locationProvider.html5Mode(true);
	})
}());

