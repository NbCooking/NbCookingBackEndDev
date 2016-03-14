require('../models/Offer');

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

var Offers = {
  search: function(req, res) {
      res.render('offers/offers', {title: 'Offers', test: req.body.addr});
  },
  getOfferId: function(req, res) {
    
  },
  addOfferId: function(req, res) {
    
  }
};

module.exports = Offers;