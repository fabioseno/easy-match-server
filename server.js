/*global require, process, console*/
var express      = require('express'),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    app          = express();

var port = process.env.PORT || 8080;

// express application setup
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'e@zyM@ttt', resave : false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes/index.js')(app, passport); // load our routes and pass in our app anpd fully configured passport

// ## DATABASE ##
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function () {
    'use strict';
    console.log('Database connected...');
});

// ## PASSPORT ##
require('./config/passport')(passport); // pass passport for configuration


// ## ROUTES ##
app.get('/home', function (req, res, next) {
    'use strict';

    res.send('ok');
});

app.listen(port);
console.log('Listening on port ' + port);