var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//ett schema bestämmer formatet för våra models olika egenskaper
var userSchema = new Schema({
  name: {
    first: {type: String},
    last: {type: String}
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
  cars: []
});


module.exports = mongoose.model('Users', userSchema); //class Vehicle


