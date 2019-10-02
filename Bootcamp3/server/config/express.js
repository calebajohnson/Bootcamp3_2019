var path = require('path'),  
    express = require('express'),  //refers to Express the middleware helper for Node.js 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connects to database
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  //initializes app
  var app = express();

  //enables request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  /* serves static files */
  app.use('/', express.static(__dirname + '/../../client'));

/* The next three middleware are important to the API */

  /* Request Handler for route /api/lisings */

  app.use('/api/listings', listingsRouter);


   /* Request Handler for coordinates
      This is a server wrapper around Open Cage Data Geocoding API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });


  /* Request Handler for all other routes
     Sends a response (res) to go to the homepage for all routes not specified */ 
  app.all('/*', function(req, res) {
   
      /*
      The path.resolve() method returns a string and resolves a sequence of paths or path segments into an absolute path.
   */
   res.sendFile(path.resolve('client/index.html')); 
  });
  
  return app;
};  