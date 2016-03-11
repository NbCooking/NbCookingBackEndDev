require('../models/Offer');

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

var Offers = {
  getHome: function(req, res) {
    res.render('index', {title: 'NbCooking'});
  },
  search: function(req, res) {
    
  },
  getOfferId: function(req, res) {
    
  },
  addOfferId: function(req, res) {
    
  }
};

module.exports = Offers;