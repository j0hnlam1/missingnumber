var mongoose = require('mongoose');

var fs = require('fs');

mongoose.connect('mongodb://0.0.0.0/PokeGo');
// this file connects to mongodb

var models_path = __dirname + "/../model"

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0) {
		require(models_path + '/' + file);
	}
})