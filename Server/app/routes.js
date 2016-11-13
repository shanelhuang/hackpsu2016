// app/routes.js

var Spoon = require('./controllers/spoon.js');
var Send = require('./controllers/send.js');
var Update = require('./controllers/update.js')

module.exports = function(app){

  app.get('/query', function(req, res){
    Spoon.question(req, function(data){
      // console.log(data);
      //Send.usrdat("Joe Schmoe", 2000, res);
      res.send(data);
    });
  });

  app.get('/getRecipeWithCal', function(req, res){
    Spoon.calRec(req, function(data){
      //console.log(data);
      //console.log("**************************");
      res.send(data);
    });
  });


  //OAuthentication
  app.get('/oauth_redirect', function(req, res){
    //Console.log('hi');
  });

}
