// app/controllers/retrieve.js

var unirest = require('unirest');
var Usr = require('../models/user');

exports.question = function(req, callback){
  // var qes = req._parsedUrl.query.replace(/ /g,"+");
  var qes = req._parsedUrl.query;
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/quickAnswer?q=" + qes)
  .header("X-Mashape-Key", "4OhDFJwzCVmshvw3a0ZUfe52n9bTp15t24FjsnnVQF0UvGemp0")
  .header("Accept", "application/json")
  .end(function (result) {
    // console.log(result.body.answer);
    callback(result.body.answer);
  });
};

exports.calRec = function(req, callback){
  var qes = req._parsedUrl.query;
  // These code snippets use an open-source library. http://unirest.io/nodejs
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?maxcalories="+ qes +"&maxcarbs=100&maxfat=20&maxprotein=100&mincalories=0&minCarbs=0&minfat=5&minProtein=0&number=10&offset=0&random=true")
  .header("X-Mashape-Key", "kZBPPdrmCfmshaApzznEaSDPodSip19g8mjjsnRCDDLMlDldKa")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result.body);
    callback(result.body[0].title);
  });
}
