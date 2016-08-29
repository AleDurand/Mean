 // set up ======================================================================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multer = require('multer');
var passport = require('passport');		

var config = require('./config/config');
mongoose.connect(config.database);    

var environment = process.env.NODE_ENV || 'development';
if(environment == 'development'){
	app.use(express.static(__dirname + '/public/', {
  		index: 'index.html'
	}));
	app.use(express.static(__dirname + '/client/'));
} else {
	app.use(express.static(__dirname + '/public')); 	
}

app.use(express.static(__dirname + '/media'));   
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));                                  
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(passport.initialize());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port " + config.port);
console.log("Running on " + environment);