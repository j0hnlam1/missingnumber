(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('chatController', chatController);

    function chatController($scope, $routeParams, userFactory, $location) {
    	var socket = io.connect('http://localhost:8000', {'sync disconnect on unload': true});

        if ($scope.person == undefined) {
            userFactory.getUser(function(data){
                var x = $.isEmptyObject(data);
                if (x == true) {
                    console.log("no user logged in");
                } else {
                    socket.emit("login", data[0].name);
                    $scope.person = data;
                }
            });
        }
    
        socket.on('messages', function(messages){
            $scope.messages = messages;
            $scope.$digest();
        });

        socket.on("userlist", function(userlist){
            $scope.userlist = userlist;
            $scope.$digest();
            console.log($scope.userlist);
        });
        if ($scope.person == undefined) {
            socket.on("data", function(data) {
                console.log(data, "in the chatController");
                var x = $.isEmptyObject(data);
                if (x == true) {
                    console.log("no user logged in");
                } else {
                    socket.emit("login", data[0].name);
                    $scope.person = data;
                }
                socket.removeListener('data');
            })
        }

        // socket.on("users", function(data){
        //     $scope.allUsers = data;
        //     console.log($scope.allUsers);
        // });

        $scope.sendMessage = function(message){
            message.name = $scope.person[0].name;
            socket.emit('new_message', message);
            document.getElementById('message').value = "";
        }
        document.getElementById("message").addEventListener("keydown", function(e) {
            if (!e) { 
                var e = window.event;
            }
            // Enter is pressed
            if (e.keyCode == 13) {
                $scope.sendMessage($scope.newMessage);
            }
        }, false);

		
    } // ends chatController function
})(); // ends everything