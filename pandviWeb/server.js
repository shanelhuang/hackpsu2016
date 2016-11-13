//server.js

//modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var path           = require ('path');
//var mongoose       = require('mongoose');		TODO remove if I don't use mongodb
//var flash          = require('connect-flash');	TODO remove if I don't need flash messages
var port           = 80;

//set ejs as view engine
app.set('view engine', 'html');

//log requests
app.use(morgan("combined"));

//parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//access public directory
app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app);

//listen
app.listen(port);
console.log('Listening on port: ' + port);

module.exports = app;
