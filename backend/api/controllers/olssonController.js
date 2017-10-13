'use strict';

var mongoose = require('mongoose'),
    Vehicles = require('../models/vehicleModel.js'),
    Users = require('../models/userModel.js');

//VEHICLES:
//hittar alla vehicle-object

exports.list_all_vehicles = (req, res) => {
  Vehicles.find({}, (err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}
exports.list_vehicles = (req, res) => {
  var query = {};
  if(req.query.gearbox) query.gearbox = req.query.gearbox;
  if(req.query.fuel) query.fuel = req.query.fuel;
  //query.requiredDriversLicense come from schema prop
  if(req.query.requiredDriversLicense){
    query.requiredDriversLicense = req.query.requiredDriversLicense
  }
  if(req.query.dailyFee){
    query.dailyFee = {$lte: req.query.dailyFee}
  }

 // console.log(query)
 Vehicles.find(query, (err, vehicle) => {
   if (err)
   res.send(err);
   res.json(vehicle);
 })

}

//skapar ett nytt vehicle-object
exports.create_a_vehicle = (req, res) => {
  var new_vehicle = new Vehicles(req.body);
  // console.log(req.body)
  new_vehicle.save((err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

//läs in ett vehicle-object utifrån id
exports.read_a_vehicle = (req, res) => {
  Vehicles.findById(req.params.vehicleId, (err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

//hitta och uppdatera ett vehicle-object utifrån id
exports.update_a_vehicle = (req, res) => {
  Vehicles.findOneAndUpdate({_id: req.params.vehicleId}, req.body, {new: true}, (err, vehicle) => {
	console.log('i Vehicle find');
    console.log('params.id: ', req.params.vehicleId);
    console.log('req.body: ', req.body);
    console.log('vehicle: ', vehicle);
    if (err)
      res.send(err);

    res.json(vehicle);
  })
}

//ta bort ett vehicle-object utifrån id
exports.delete_a_vehicle = (req, res) => {
  Vehicles.remove({
    _id: req.params.vehicleId
  }, (err, vehicle) => {
    if(err)
      res.send(err);
    res.json({ message: 'Vehicle successfully deleted' });
  });
};

//USERS:
//hittar alla user-object
exports.list_all_users = (req, res) => {
  Users.find({}, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

//skapa nytt user-object
exports.create_a_user = (req, res) => {

 var new_user = new Users(req.body);
 console.log('req:  !!!!!!!')
 new_user.save((err, user) => {
   if (err)
     res.send(err);
   res.json(user);
 })
}

//läs in ett user-object utifrån id
exports.read_a_user = (req, res) => {
  Users.findById(req.params.userId, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

//hitta och uppdater ett user-object utifrån id
exports.update_a_user = (req, res) => {
  console.log('i update_a_user');
  Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {
    console.log('i User find');
    console.log('params.id: ', req.params.userId);
    console.log('req.body: ', req.body);
    console.log('user: ', user);
    if (err)
      res.send(err);
    res.json(user);
  })
}

//ta bort ett user-object utfrån id
exports.delete_a_user = (req, res) => {
  Users.remove({
    _id: req.params.userId
  }, (err, user) => {
    if(err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
