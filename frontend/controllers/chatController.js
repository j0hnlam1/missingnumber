(function(){
  'use_strict';
  angular
    .module('Myapp')
    .controller('chatController', chatController);

    function chatController($scope, $routeParams, userFactory, $location) {
    	var socket = io.connect({'sync disconnect on unload': true});
        var userSocket;
        $scope.userlist = [];

        // gets the socket id of the userfactory for potential use farther down
        userFactory.socketInfo(function(data) {
            userSocket = data;
        })
        // if the user is already logged in on page load and we dont need to wait for google
        // we grab the user info from the factory here
        if ($scope.person == undefined) {
            userFactory.getUser(function(data){
                var x = $.isEmptyObject(data);
                if (x == true) {
                    console.log("no user logged in");
                } else {
                    socket.emit("login", data[0].name);
                    $scope.person = data[0];
                    // $scope.userlist.push($scope.person.name);
                }
            });
        }
        // if the user is NOT logged in or we are waiting for google, we turn on a socket listener
        // if the eventual emit of the socket has the same id as the one we got above then we make 
        // that info equal to $scope.person and add it to the userlist
        if ($scope.person == undefined) {
            socket.on("data", function(data) {
                var res = data.info.slice(2);
                if (res == userSocket.id) {
                    var x = $.isEmptyObject(data.data);
                    if (x == true) {
                        console.log("no user logged in");
                    } else {                
                        socket.emit("login", data.data[0].name);
                        $scope.person = data.data[0];
                        // $scope.userlist.push($scope.person.name);
                        $scope.$digest();
                    }
                    socket.removeListener('data');
                }
            })
        }
        // on login this is received from the server with the array of all messages
        socket.on("firstMessages", function(messages) {
            $scope.messages = messages;
            $scope.$digest();
        })
        // when a new user logs on they send a broadcast that gets caught here and $scope.userlist
        // gets replaced with the server userlist
        socket.on("newUser", function(newUserList){
            console.log(newUserList);
            $scope.userlist = newUserList;
            $scope.$digest();
        });
        // a message is sent and we send the message to the server
        $scope.sendMessage = function(message){
            message.name = $scope.person.name;
            socket.emit('new_message', message);
            document.getElementById('message').value = "";
        }
        // we receive any new messages from the server and replace them all with the server array
        socket.on('messages', function(messages){
            $scope.messages = messages;
            $scope.$digest();
        });
        // when a user disconnects this removes them from the userlist
        socket.on("removeUser", function(userList) {
            $scope.userlist = userList;
            console.log(userList);
            $scope.$digest();
        })
        
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