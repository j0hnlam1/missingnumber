var mongoose = require('mongoose');
var Gym = mongoose.model('Gym');

module.exports = (function() {
	return {
		index: function(req, res){
			console.log(req);
		},
		create: function(req, res){
			console.log(req.body);
			Gym.create({position: req.body.position}, function(err, results) {
				if(err){
					console.log(err);
				}
			})
		},
		find: function(req, res){
			Gym.find({}, function(err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		}
	}
})();