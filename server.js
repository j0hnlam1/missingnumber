var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// var bcrypt = require('bcrypt');

var app = express();

app.use(express.static(path.join(__dirname, './frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.all('/aboutus', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/frontend/index.html', { root: __dirname });
});
app.all('/chat', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/frontend/index.html', { root: __dirname });
});
app.all('/trade', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/frontend/index.html', { root: __dirname });
});


require('./backend/config/db.js');
require('./backend/config/routes.js')(app);

// app.listen(8000, function(){
// 	console.log('listening port 8000.....');
// })

var server = app.listen(8000, function(){
	console.log('now listening to port 8000');
	console.log('chat room');
})
var io = require('socket.io').listen(server);

var messages = [];
var users = [];

io.sockets.on('connection', function(socket){
	console.log('connection');
	// socket.emit('messages', messages);
	// socket.emit('userlist', users);
	var me = "";
	socket.on("login", function(user){
		console.log(me);
		var index = users.indexOf(user);
		users.splice(index, 1);
		users.push(user);
		me = user;
		// socket.emit("users", users);
		socket.emit('messages', messages);
		socket.emit('userlist', users);
	})

	socket.on('new_message', function(data){
		console.log(data);
		messages.push(data);
		io.sockets.emit('messages', messages);
	})

	socket.on('info', function(data) {
		console.log(data, "in the socket.info");
		socket.broadcast.emit('data', data);
	})
	socket.on('disconnect', function(){
		console.log('disconnect');
		var index = users.indexOf(me);
		users.splice(index, 1);
	})
})