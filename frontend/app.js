var myApp = angular.module('Myapp', ["ngRoute",
									 "ngMap",
									 "oc.lazyLoad", 
									 "ngMapAutocomplete",
									 "ngMaterial",
									 "ngMessages",
									 "material.svgAssetsCache"
									]);

(function(){
	myApp.config(function($routeProvider, $locationProvider){

		$routeProvider

			.when('/', 
			{
				controller: 'mapController',
				// controllerAs: 'mapCtrl',
				templateUrl: "partials/home.html"
			})
			.when('/chat', 
			{
				templateUrl: "partials/chat.html"
			})
			.when('/trade', 
			{
				templateUrl: "partials/trade.html"
			})
			.when('/aboutus', 
			{
				controller: "aboutusController",
				templateUrl: "partials/aboutus.html"
			})
			.when('/signin', 
			{
				templateUrl: "partials/signin.html"
			})
			.when('/register', 
			{
				templateUrl: "partials/register.html"
			})
			.otherwise({
				redirectTo: "/"
			});

		 // check browser support
        if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

        	// to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

         	// if you don't wish to set base URL then use this
         	$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
          	});
        }  
        // $locationProvider.html5Mode(true);
       
	});
}());

