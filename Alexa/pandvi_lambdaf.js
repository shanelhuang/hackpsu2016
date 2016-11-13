var http = require('http');
/**
 * Examples:
 *  User: "Alexa, Pandvi"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.4e3b9339-dc9e-43ea-8831-0df1875a22e8"; //alex id: amzn1.ask.skill.4e3b9339-dc9e-43ea-8831-0df1875a22e8
//eric id: amzn1.ask.skill.924c54aa-2b26-457e-aaf2-6cd47c093db6

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Pandvi = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Pandvi.prototype = Object.create(AlexaSkill.prototype);
Pandvi.prototype.constructor = Pandvi;

Pandvi.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Pandvi onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Pandvi.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Pandvi onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    //var speechOutput = "yo";
    //var repromptText = "You can say hello";
    //response.ask(speechOutput, repromptText);
};

Pandvi.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Pandvi onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Pandvi.prototype.intentHandlers = {
    // register custom intent handlers
    "GetRecipeWithIngredient": function (intent, session, response) {
        var ingred = intent.slots.Ingred.value;
        http.get("http://pandvi.herokuapp.com/getRecipeWithIngred?" + ingred, function(res) {
          res.on('end', function() {
            console.log(res);
          });
        })
        .on('error', function(e) {
          console.log("Got error: " + e.message);
        });
      //session is object! pass session through for good things to happen
        response.tellWithCard(" Recipe is ");
    },
    "GetRecipeWithCalories": function (intent, session, response) {
        var cal = intent.slots.Cal.value;
        var event = {"url": "http://pandvi.herokuapp.com/getRecipeWithCal?" + cal};
        function test(event, context) {
          console.log('start request to ' + event.url)
          http.get(event.url, function(res) {
            console.log("Got response: " + res.statusCode);
            context.succeed();
          }).on('end', function(r){
              console.log(r);
          }).on('error', function(e) {
            console.log("Got error: " + e.message);
            context.done(null, 'FAILURE');
          });
          console.log('end request to ' + event.url);
        }
        test(event, null);
        console.log("done?!?!?!?!?!");
        response.tellWithCard("we are out of luck!");
    },
    "GetRecipeWithIngredientCalories": function (intent, session, response) {
        var ingred = intent.slots.Ingred.value;
        var cal = intent.slots.Cal.value;
        http.get("http://pandvi.herokuapp.com/getRecipeWithIngredCalories?" + ingred +"&"+ cal, function(res) {
          res.on('end', function() {
            console.log(res);
          });
        })
        .on('error', function(e) {
          console.log("Got error: " + e.message);
        });
        response.tellWithCard("Recipe is");
    },
    "QuestionQuery": function (intent, session, response) {
        response.tellWithCard(" spoonacular says " + resp);
    },
    "GetNutritionDetails": function (intent, session, response) {
        var ingred = intent.slots.Ingred.value;
        http.get("http://pandvi.herokuapp.com/getRecipeWithIngred?" + ingred, function(res) {
          res.on('end', function() {
            console.log(res);
          });
        })
        .on('error', function(e) {
          console.log("Got error: " + e.message);
        });
        response.tellWithCard("nutrition values for are");
    },
    "UpdateUserDataCalories": function (intent, session, response) {
        //http://pandvi.herokuapp.com/updateCalories?200
        response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },
    "UpdateUserDataFood": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },"PopulateToCart": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Pandvi skill.
    var pandvi = new Pandvi();
    pandvi.execute(event, context);
};
