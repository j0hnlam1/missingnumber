(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('userController', userController);


function userController($scope, $routeParams, $route, $location, $ocLazyLoad, userFactory){


  /*********************** navbar stuffs ***********************/

  $scope.isActive = function (viewLocation) { 
          return viewLocation === $location.path();
  };
  
  $scope.loginbutton = true;
  // shows goggle sign in button
  $scope.logoutbutton = false;
  // shows logout button if signed in
  $scope.user = {};
  // displays logged in users info
  
  /********************** end of navbar stuffs *****************/

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
            $scope.user = userInfo;
            $scope.loginbutton = false;
            $scope.logoutbutton = true;
        });
   }
   function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        userFactory.logout();
        $scope.loginbutton = true;
        $scope.logoutbutton = false;
    
        socket.emit('logout', userInfo.name);

        $route.reload();
    }
    window.onSignIn = onSignIn;
    window.signOut = signOut;

   }
})();