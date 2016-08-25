var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//
console.log("on");
const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('key-cert.pem')
};
//

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

// var server = https.createServer(options, app).listen(3000, function(){
//     console.log("server started at port 3000");
// });



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
		console.log(socket.id);
		console.log(data);
		socket.broadcast.emit('data', {data: data, info: socket.id});
	})
	socket.on('disconnect', function(){
		console.log('disconnect');
		var index = users.indexOf(me);
		users.splice(index, 1);
	})
})