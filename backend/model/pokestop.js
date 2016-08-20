var mongoose = require('mongoose');

var PokestopSchema = new mongoose.Schema({
  	position : Array,
  	createdAt : {type: Date, default: Date.now},
  	votes: {
      count: Number,
      up: Array,
      down: Array
  	}
});
mongoose.model('Pokestop', PokestopSchema);