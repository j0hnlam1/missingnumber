var mongoose = require('mongoose');

var GymSchema = new mongoose.Schema({
  	position : Array,
  	createdAt : {type: Date, default: Date.now}
});
mongoose.model('Gym', GymSchema);