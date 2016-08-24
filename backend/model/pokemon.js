var mongoose = require('mongoose');

var PokeSchema = new mongoose.Schema({
  	pokeId : Number,
  	position : Array,
  	createdAt : {type: Date, default: Date.now},
  	votes: {
      count: Number,
  		up: Array,
  		down: Array
  	}
});
mongoose.model('Pokemon', PokeSchema);