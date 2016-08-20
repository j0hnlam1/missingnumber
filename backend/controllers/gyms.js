var mongoose = require('mongoose');
var Gym = mongoose.model('Gym');

module.exports = (function() {
	return {
		index: function(req, res){
			console.log(req);
		},
		create: function(req, res){
			console.log(req.body);
			Gym.create({position: req.body.position, votes: {count: 1, up: req.body.user}}, function(err, results) {
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
		},
		remove: function(req, res) {
			var pos = [];
			pos.push(parseFloat(req.params.lat));
			pos.push(parseFloat(req.params.lng));
			Gym.remove({position: pos}, function(err, results) {
				if (err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		vote: function(req, res) {
			console.log('here');
			var pos = [];
			var pokemon = {};
			var voted = false;
			pos.push(parseFloat(req.body.lat));
			pos.push(parseFloat(req.body.lng));
			Gym.find({position: pos}, function(err, results) {
				if (err) {
					console.log(err)
				} else {
					pokemon = results[0];
					for (var i = 0; i < pokemon.votes.up.length; i++) {
						if (pokemon.votes.up[i] == req.body.user) {
							console.log('already voted');
							voted = "up";
						}
					}
					if (voted == false) {
						for (var i = 0; i < pokemon.votes.down.length; i++) {
							if (pokemon.votes.down[i] == req.body.user) {
								console.log('already voted');
								voted = "down";
							}
						}
					}
					if (voted == false) {
						if (req.body.type == 0) {
							pokemon.votes.count++;
							var users = pokemon.votes.up;
							users.push(req.body.user);
							pokemon.votes.up = users;
							pokemon.save(function(err, results) {
								if (err) {
									console.log(err);
								} else {
									res.json(results);
								}
							})

						} else {
							pokemon.votes.count--;
							var users = pokemon.votes.down;
							users.push(req.body.user);
							pokemon.votes.down = users;
							pokemon.save(function(err, results) {
								if (err) {
									console.log(err);
								} else {
									res.json(results);
								}
							})
						}
					} else if (voted == "up") {
						if (req.body.type == 1) {
							console.log("was up now down");
							pokemon.votes.count = pokemon.votes.count - 2;
							var downusers = pokemon.votes.down;
							downusers.push(req.body.user);
							pokemon.votes.down = downusers;
							var index = pokemon.votes.up.indexOf(req.body.user);
							pokemon.votes.up.splice(index, 1);
							pokemon.save(function(err, results) {
								if (err) {
									console.log(err);
								} else {
									res.json(results);
								}
							})

						} 
					} else {
						if (req.body.type == 0) {
							console.log("was down now up");
							pokemon.votes.count = pokemon.votes.count + 2;
							var upusers = pokemon.votes.up;
							upusers.push(req.body.user);
							pokemon.votes.up = upusers;
							var index = pokemon.votes.down.indexOf(req.body.user);
							pokemon.votes.down.splice(index, 1);
							pokemon.save(function(err, results) {
								if (err) {
									console.log(err);
								} else {
									res.json(results);
								}
							})
						}
					}
				}
			});
		}
	}
})();