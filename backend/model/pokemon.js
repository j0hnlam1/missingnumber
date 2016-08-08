var mongoose = require('mongoose');

var PokeSchema = new mongoose.Schema({
  	pokemonID : Number,
  	position : {
  		lat: Number,
  		lng: Number
  	},
  	createdAt : {type: Date, default: Date.now}
});
mongoose.model('Pokemon', PokeSchema);