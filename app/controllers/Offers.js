require('../models/Offer');

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

var Offers = {
<<<<<<< HEAD
=======
  getHome: function(req, res) {
    res.render('index', {title: 'NbCooking'});
  },
>>>>>>> 13c6d4a335f4dee6ecbbfa1b7e2b731d11f29d9e
  search: function(req, res) {
    
  },
  getOfferId: function(req, res) {
    
  },
  addOfferId: function(req, res) {
    
  }
};

module.exports = Offers;