var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//
console.log("on");
const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync('mykey.pem'),
  cert: fs.readFileSync('mycsr.pem'),
  ca: fs.readFileSync('1_www.pokehorizon.com_bundle.crt')
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


var server = app.listen(8000, function(){
	console.log('now listening to port 8000');
	console.log('chat room');
})

// var server = https.createServer(options, app).listen(8000, function(){
//     console.log("server started at port 8000");
// });



var io = require('socket.io').listen(server);

var messages = [];
var users = [];

io.sockets.on('connection', function(socket){
	console.log('connection');
	var me = "";

	// from userFactory when logging in
	socket.on('info', function(data) {
		socket.broadcast.emit('data', {data: data, info: socket.id});
	})
	// chat controller sends user info here and adds them to the users array, also sends current messages
	socket.on("login", function(user){
		var index = users.indexOf(user);
		if (index != -1) {
			users.splice(index, 1);
		}
		users.push(user);
		me = user;
		io.sockets.emit('newUser', users);
		socket.emit('firstMessages', messages);
	})
	// receives new message, adds it to array, and emits whole array
	socket.on('new_message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	})
	// disconnect events
	socket.on('disconnect', function(){
		console.log('disconnect');
		if (me != "") {
			var index = users.indexOf(me);
			// console.log(me);
			// console.log(index);
			if (index != -1) {

				users.splice(index, 1);
				console.log(users);
				socket.broadcast.emit('removeUser', users)
			}
		}
		
	})
})