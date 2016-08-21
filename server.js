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
var users = {};
var messages = [];

io.sockets.on('connection', function(socket){

	socket.emit('messages', messages);

	socket.on('new_message', function(data){
		console.log(data);
		messages.push(data);
		io.sockets.emit('messages', messages);
	})
	socket.on('disconnect', function(){
	
	})
})