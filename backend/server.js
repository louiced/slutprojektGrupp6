var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    Vehicles = require('./api/models/vehicleModel.js'),
    Users = require('./api/models/userModel.js');
    
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/olsson', {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routers.js');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);
console.log(`olsson RESTful API server started on: ${port}`);