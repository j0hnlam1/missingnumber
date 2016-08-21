(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('chatController', chatController);

    function chatController($scope, $routeParams, userFactory, $location) {

    	userFactory.getUser(function(data){
    		console.log(data, "loggeduser");
    		$scope.user = data;
    	});

    	userFactory.getAllUsers(function(data){
    		console.log(data, "allusers");
    		$scope.allUsers = data;
    	})

    }
})();