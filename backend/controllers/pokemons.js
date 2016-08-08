var mongoose = require('mongoose');
var Pokemon = mongoose.model('Pokemon');

module.exports = (function() {
	return {
		index: function(req, res){
			console.log(req);
		}

	}
})();