var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  	name : String,
  	email : String,
  	imageUrl: String
});
mongoose.model('User', UserSchema);