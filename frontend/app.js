var myApp = angular.module('Myapp', ["ngRoute",
									 "ngMap", 
									 "ngMapAutocomplete",
									 "ngMaterial",
									 "ngMessages"
									]);

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

		 //check browser support
        if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

        	// to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

         	// if you don't wish to set base URL then use this
         	$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
          	});
        }
	});
}());

