var mongoose = require('mongoose');

var PokeSchema = new mongoose.Schema({
  	pokeId : Number,
  	position : Array,
  	createdAt : {type: Date, default: Date.now}
});
mongoose.model('Pokemon', PokeSchema);