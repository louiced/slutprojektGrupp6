var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//ett schema bestämmer formatet för våra models olika egenskaper
var vehicleSchema = new Schema({
  fordonstyp: String,
  requiredDrivingLicense: String,
  brand: String,
  model: String,
  year: Number,
  gearbox: String,
  dagshyra: Number,
  kommentar: String
});


module.exports = mongoose.model('Vehicles', vehicleSchema); //class Vehicles
