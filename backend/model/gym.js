var mongoose = require('mongoose');

var GymSchema = new mongoose.Schema({
  	position : Array,
  	createdAt : {type: Date, default: Date.now},
  	votes: {
  		count: Number,
      up: Array,
      down: Array
  	}
});
mongoose.model('Gym', GymSchema);