(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('chatController', chatController);

    function chatController($scope, $routeParams, userFactory, $location) {

    	var socket = io.connect();

        userFactory.getUser(function(data){
            if ( data == null ) {
                console.log("no user logged in");
                $route.reload();
            } else {
                console.log(data);
                socket.emit("login", data[0].name);
                $scope.person = data; 
            }
        });

        socket.on('messages', function(messages){
            $scope.messages = messages;
        });

        socket.on("userlist", function(userlist){
            $scope.userlist = userlist;
            console.log($scope.userlist);
        }); 


        // socket.on("users", function(data){
        //     $scope.allUsers = data;
        //     console.log($scope.allUsers);
        // });

        $scope.sendMessage = function(message){
            message.name = $scope.person[0].name;
            socket.emit('new_message', message);
        }

		
    } // ends chatController function
})(); // ends everything