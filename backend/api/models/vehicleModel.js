var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//ett schema bestämmer formatet för våra models olika egenskaper
var vehicleSchema = new Schema({
  vehicleType: String,
  requiredDriversLicense: String,
  brand: String,
  model: String,
  year: Number,
  gearbox: String,
  dailyFee: Number,
  fuel: String,
  comments: [{type: String}],
  status: String,
  bookings: []
});


module.exports = mongoose.model('Vehicles', vehicleSchema); //class Vehicles
