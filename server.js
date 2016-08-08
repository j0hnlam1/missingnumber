var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, './frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./backend/config/db.js');
require('./backend/config/routes.js')(app);
app.listen(8000, '0.0.0.0', function(){
	console.log('listening port 8000.....');
})