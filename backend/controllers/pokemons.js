var mongoose = require('mongoose');
var Pokemon = mongoose.model('Pokemon');

module.exports = (function() {
	return {
		index: function(req, res){
			console.log(req);
		},
		create: function(req, res){
			console.log(req.body);
			Pokemon.create({pokeId: req.body.pokeId, position: req.body.position}, function(err, results) {
				if(err){
					console.log(err);
				}
			})
		},
		find: function(req, res){
			Pokemon.find({}, function(err, results){
				console.log(results);
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		}
	}
})();