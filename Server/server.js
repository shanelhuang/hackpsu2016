//server.js

//modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var path           = require ('path');
var mongoose       = require('mongoose');
var port           = process.env.PORT || 3000;

//log requests
// app.use(morgan("combined"));

//parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
require('./app/routes')(app);

//listen
app.listen(port);
console.log('Listening on port: ' + port);

module.exports = app;
