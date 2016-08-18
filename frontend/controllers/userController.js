myApp.controller('userController', function($scope, $routeParams, $location, $ocLazyLoad){
	
	console.log("asdasdas");

	$ocLazyLoad.load(
  		['https://apis.google.com/js/platform.js'],
  		{cache: false}
		);

	
      $scope.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
   
})