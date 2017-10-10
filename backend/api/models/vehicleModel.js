var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//ett schema bestämmer formatet för våra models olika egenskaper
var vehicleSchema = new Schema({
  vehicleType: String,
  requiredDrivingLicense: String,
  brand: String,
  model: String,
  year: Number,
  gearbox: String,
  dailyFee: Number,
  comments: String,
  status: String
});


module.exports = mongoose.model('Vehicles', vehicleSchema); //class Vehicles
