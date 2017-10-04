const mongoose = require('mongoose'),
	  express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  Vehicle = require('../models/vehicleModel.js');

// Connect to DB

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/olsson', {
	useMongoClient: true
}, () => {
	Vehicle.find({}, (err, data) => {
	if (err){
		console.log(err);
	} else {
		console.log('data');
		console.log(data);
		
	}
		console.log(mongoose.connection.name);
})
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());




