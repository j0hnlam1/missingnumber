(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('chatController', chatController);

    function chatController($scope, $routeParams, userFactory, $location) {

    	userFactory.getUser(function(data){
    		console.log(data, "person");
    		$scope.person = data;
    	});

    	userFactory.getAllUsers(function(data){
    		console.log(data, "allusers");
    		$scope.allUsers = data;
    	});


    	var socket = io.connect();
    	console.log(socket);

    	$scope.sendMessage = function(message){
    		console.log(message, "who sent the message");
    		message.name = $scope.person[0].name;
    		console.log(message);
			socket.emit('new_message', message);
    	}

		socket.on('messages', function(data){
			console.log(data, "socket on messages");
			$scope.messages = data;
		});		
		
    } // ends chatController function
})(); // ends everything