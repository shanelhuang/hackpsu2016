// app/models/message.js

var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var dbconf         = require('../../config/userdb');

//connect to db
var authdb = mongoose.createConnection(dbconf.url);

var userSchema = new Schema({
  usr: String,
  cal: String
});

var user = authdb.model('user', userSchema);

module.exports = user;
