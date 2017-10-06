var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//ett schema bestämmer formatet för våra models olika egenskaper
var userSchema = new Schema({
	name: String
});


module.exports = mongoose.model('Users', userSchema); //class Vehicle


/*{
  name: {
    type: String,
    required: true,
    first: String,
    last: String
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  age: {
    required: true,
    type: Number 
  },
  driversLicense: {
    required: true,
    type: String
  },
  cars: [{type: Object}]
}*/