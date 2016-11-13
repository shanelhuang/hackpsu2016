var User = require('../models/user');

exports.usrdat = function(name, calorie, res){
  var user = new User({
    usr: name,
    cal: calorie
  });

  user.save(function(err){
    if(err){
      res.json(err);
    }
  });
};
