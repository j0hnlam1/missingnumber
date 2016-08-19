var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		index: function(req, res) {
			console.log(req);
		},
		login: function(req, res) {
			User.find({email: req.body.email}, function(err, results) {
				if (err) {
					console.log(err);
				} else {
					if (results.length > 0) {
						// user has account already
						res.json(results);
					} else {
						User.create({name: req.body.name, email: req.body.email, imageUrl: req.body.imageUrl}, function(err, results) {
							if (err) {
								console.log(err);
							} else {
								// create new user
								res.json(results);
							}
						})
					}
				}
			})
		}
	}
})();