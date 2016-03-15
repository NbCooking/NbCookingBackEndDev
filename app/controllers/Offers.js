require('../models/Offer');
var request = require('request');
var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

var Offers = {
    
    
  search: function(req, res) {
      
      var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Cergy+France&destinations=Menucourt+France&key=';
      request(url, function(err, result, body){
          var obj = JSON.parse(body);
          var distance = obj['rows'][0]['elements'][0]['distance']['value'] ;
          res.render('offers/offers', {title: 'Offers', test: distance});
      });
      
  },

    
    
  getOfferId: function(req, res) {
    
  },
  addOfferId: function(req, res) {
    
  }
};

module.exports = Offers;