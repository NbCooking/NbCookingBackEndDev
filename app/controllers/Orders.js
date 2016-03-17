require('../models/Order');

var mongoose = require('mongoose');
var Order = mongoose.model('Order');

dateNow = dateFormat(Date.now(), 'year: yyyy, month: mm, day: dd');
console.log(dateNow);

var Orders = {
  getCart: function(req, res) {
    
  },
	payCart: function(req, res) {
		var sessionCart = ['0sdgs650dgfs', '1sdgs650dgfs', '2sdgs650dgfs', '3sdgs650dgfs'];
		var sessionId = 'ssdf9sdf9sf';
		
		var o = new Order ({
			clientId: sessionId,
  		priceTotal: ,
			cart: sessionCart
		});
	}
};

module.exports = Orders;