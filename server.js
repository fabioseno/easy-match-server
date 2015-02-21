/*global require, process, console*/
var express      = require('express'),
	mongoose     = require('mongoose'),
	passport     = require('passport'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser'),
	session      = require('express-session'),
	MongoStore	 = require('connect-mongo')(session),
	app          = express();

var port = process.env.PORT || 8080;

// express application setup
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ## DATABASE ##
var configDB = require('./config/database');

mongoose.connect(configDB.url);
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function () {
	'use strict';
	console.log('Database connected...');
});

// required for passport
app.use(session({
	secret: 'e@zyM@ttt',
	resave : false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// ## PASSPORT ##
require('./config/passport')(passport); // pass passport for configuration


// ## ROUTES ##
require('./routes/')(app, passport); // load our routes and pass in our app anpd fully configured passport


app.listen(port);
console.log('Listening on port ' + port);