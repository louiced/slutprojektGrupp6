var mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Vehicla = require('./models/vehiclaModel.js'),
    //routy = require('./routes.js'),
    
    port = 3000;

// Koppla upp mot en databas
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mockup-ld', {
    useMongoClient: true
});


app.use('/', routy);

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Lista alla medlemmar. Namn samt avgift per kvm.
Vehicle.find({}, function (err, data) {
    if (err)
        console.log(err)
    else
        console.log("Alla fordon")
        data.forEach(function(vehicle){
            console.log(vehicle)
        })
})

app.listen(port);
console.log(`${port} lyssnar på http-request`);