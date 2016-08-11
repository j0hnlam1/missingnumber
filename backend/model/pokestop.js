var mongoose = require('mongoose');

var PokestopSchema = new mongoose.Schema({
  	position : Array,
  	createdAt : {type: Date, default: Date.now}
});
mongoose.model('Pokestop', PokestopSchema);