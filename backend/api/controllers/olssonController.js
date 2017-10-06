'use strict';

var mongoose = require('mongoose'),
    Vehicles = require('../models/vehicleModel.js'),
    Users = require('../models/userModel.js');

//vehicles:
exports.list_all_vehicles = (req, res) => {
  Vehicles.find({}, (err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

exports.create_a_vehicle = (req, res) => {
  var new_vehicle = new Vehicle(req.body);
  new_vehicle.save((err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

exports.read_a_vehicle = (req, res) => {
  Vehicles.findById(req.params.vehicleId, (err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

exports.update_a_vehicle = (req, res) => {
  Vehicles.findOneAndUpdate({_id: req.params.vehicleId}, req.body, {new: true}, (err, vehicle) => {
    if (err)
      res.send(err);
    res.json(vehicle);
  })
}

exports.delete_a_vehicle = (req, res) => {
  Vehicles.remove({
    _id: req.params.vehicleId
  }, (err, vehicle) => {
    if(err)
      res.send(err);
    res.json({ message: 'Vehicle successfully deleted' });
  });
};

//users:
exports.list_all_users = (req, res) => {
  Users.find({}, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

exports.create_a_user = (req, res) => {
  // let bo = JSON.stringify(req.body);
  var new_user = new Users(req.body);
  console.log('req:  !!!!!!!')
  new_user.save((err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

exports.read_a_user = (req, res) => {
  Users.findById(req.params.userId, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

exports.update_a_user = (req, res) => {
  Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  })
}

exports.delete_a_user = (req, res) => {
  Users.remove({
    _id: req.params.userId
  }, (err, user) => {
    if(err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
