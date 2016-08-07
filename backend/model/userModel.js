var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  	name : {
  		type: String,
  		required: [true, 'Cannot be empty'],
  		minlength: [5, "Too Short"],
  		maxlength: [15, "Too Long"]
  	}

});