//app/routes.js
var retrieve = require('./controllers/retrieve.js');

module.exports = function(app)
{

  app.get('/', function(req, res){
    res.render(__dirname + '/views/home.ejs');
  });

  app.get('/about', function(req, res){
    res.render(__dirname + '/views/about.ejs');
  });

  app.get('/all', function(req, res){
    retrieve.output(function(data){
      res.render(__dirname + '/views/all.ejs', {
        usrs: data,
      });
    });
  });

  app.get('/contact', function(req, res){
    res.render(__dirname + '/views/contact.ejs');
  });

  app.get('/personal', function(req, res){
    res.render(__dirname + '/views/personal.ejs');
  });

}
