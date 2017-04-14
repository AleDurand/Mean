 // set up ======================================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');
var multer = require('multer');
var passport = require('passport');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var path = require('path');
var winston = require('winston');
	winston.emitErrs = true;
require('winston-daily-rotate-file');


var config = require('./config/config');
mongoose.connect(config.database);

var environment = process.env.NODE_ENV || 'development';
if(environment == 'development'){
	app.use(express.static(__dirname + '/public/', {
  		index: 'index.html'
	}));
	app.use(express.static(__dirname + '/client/'));
	app.use(morgan('dev'));
} else {
	app.use(express.static(__dirname + '/public'));
	fs.existsSync('logs') || fs.mkdirSync('logs');
	var logger = new (winston.Logger)({
		transports: [
        	new (winston.transports.DailyRotateFile)({
            	filename: '-all.log',
            	dirname: 'logs',
            	datePattern: 'yyyy-MM-dd',
            	prepend: true,
            	timestamp: 'YYYY-MM-DD'
        	}),
        	new winston.transports.File({ filename: 'all', json: false }),
        	new winston.transports.Console({
            	level: 'debug',
            	handleExceptions: false,
            	json: false,
            	colorize: true
        	})
    	],
	    exceptionHandlers: [
      		new (winston.transports.DailyRotateFile)({
            	filename: '-exceptions.log',
            	dirname: 'logs',
            	datePattern: 'yyyy-MM-dd',
            	prepend: true,
            	timestamp: true,
            	humanReadableUnhandledException: true
        	}),
        	new winston.transports.Console({
            	level: 'debug',
            	json: true,
            	colorize: true
        	})
	    ],
	    exitOnError: false
	});

	var accessLogStream = FileStreamRotator.getStream({
  		date_format: 'YYYY-MM-DD',
  		filename: path.join(path.join(__dirname, 'logs'), '%DATE%-requests.log'),
  		frequency: 'daily',
  		verbose: true
	})
	app.use(morgan('combined', {stream: accessLogStream}))

}

app.use(express.static(__dirname + '/media'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(passport.initialize());

require('./server/routes.js')(app);

app.listen(config.port);

console.log("[APPLICATION] App listening on port " + config.port);
console.log("[APPLICATION] Running on " + environment);
