 // set up ======================================================================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var port     = 50000;                // set the port
var database = require('./config/database');            // load the database config
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multer = require('multer');
var fs = require('fs');
var passport = require('passport');		//Authentication 
var media = require('./config/media');
// configuration ===============================================================
mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

app.use(__dirname + '/private');                 // set the static files location /public/img will be /img for users
app.use(__dirname + '/media');   
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));                                  
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(passport.initialize());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);