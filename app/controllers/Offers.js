require('../models/Offer');
var request = require('request');
var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

var Offers = {
    
    
  search: function(req, res) {
      
      urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=APIKEY'
      request(urlConvert, function(err, result, body){
            var parsedBody = JSON.parse(body);
            console.log(parsedBody['results'][0]['geometry']['location']);
            console.log('---------------------------------------------------')
            lat = parsedBody['results'][0]['geometry']['location']['lat'];
            console.log(lat);
            long = parsedBody['results'][0]['geometry']['location']['lng'];
            console.log(long);
          
            var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +lat+','+long+'&destinations=Menucourt France&key=APIKEY';
            request(url, function(err, result, body){
                var obj = JSON.parse(body);
                console.log(obj);
                var distance = obj['rows'][0]['elements'][0]['distance']['value'];
                res.render('offers/offers', {title: 'Offers', test: distance+' m'});
                });
      });
      
      
      
  },

    
    
  getOfferId: function(req, res) {  
    
  },
  addOfferId: function(req, res) {
    
  }
};

module.exports = Offers;