var config = require('../config/config'), 
    request = require('request');



module.exports = function(req, res, next) {
  if(req.body.address) {
      //This code just formats the address so that it doesn't have space and commas using escape characters
      var addressTemp = req.body.address;
      var addressTemp2 = addressTemp.toLowerCase();
      var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
      var addressTemp4 = addressTemp3.replace(/,/g , "%2C");
      
    //Sets up options q and key
    var options = { 
      q: addressTemp4,
      key: config.openCage.key,  
    }

    //Sets up request using URL and options
    request({
      url: 'https://api.opencagedata.com/geocode/v1/json', 
      qs: options
      }, function(error, response, body) {
        /*Saves the coordinates in req.results -> 
          this information will be accessed by listings.server.model.js 
          to add the coordinates to the listing request to be saved to the database.
          Assumption: if we get a result we will take the coordinates from the first result returned
        */

        if (error) {
          console.log(err);
          res.status(400).send(err);
        } else {
          //JSON.parse to get contents. Remember to look at the response's JSON format in open cage data
          var data = JSON.parse(body);

          // req.results = stores the coordinates
          req.results = data.results[0].geometry;
        }

        next();
    });
  } else {
    next();
  }
};  