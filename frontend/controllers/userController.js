myApp.controller('userController', function($scope, $routeParams, $location, $ocLazyLoad, userFactory){
	
	var userInfo = {};
    var login = null;

	$ocLazyLoad.load(
  		['https://apis.google.com/js/platform.js'],
  		{cache: false}
		);

	
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        var name = profile.getName();
        var imageUrl = profile.getImageUrl();
        var email = profile.getEmail();
        login = profile.getId();
        var user = ({name: name, imageUrl: imageUrl, email: email});
        userFactory.login(user, login, function(user) {
            userInfo = user[0];
        });
   }
   function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        userFactory.logout();
        $location.path('/map');
    }
    window.onSignIn = onSignIn;
    window.signOut = signOut;

   
})