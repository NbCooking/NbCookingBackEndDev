require('../models/Order');

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Offer = mongoose.model('Offer');

var Orders = {
  getCart: function(req, res) {
      
    if(!req.session.nbcooking){res.redirect('/login');}
    if(req.session.cart = null){res.redirect('/');}
    var cart = [];
		var promises = []; 
		
		req.session.cart.forEach(function(element, index, array) {
			promises[index] = new Promise(function(resolve, reject){
					Offer.findById(element, function(err, offer) {
						var cartOffer = [[offer._id][offer.title][offer.price]];
						cart.push(cartOffer);
						resolve(cart);
				});
			});
		});
		
		Promise.all(promises).then(function(tt){
			res.render('orders/cart', {title: 'Panier', cart: cart, connected: req.session.nbcooking})
		});
  },
	payCart: function(req, res) {
		var priceTotal = 0;
		var promises = []; 
		
		req.session.cart.forEach(function(element, index, array) {
			promises[index] = new Promise(function(resolve, reject){
					Offer.findById(element, function(err, offer) {
						priceTotal += offer.price;
						resolve(priceTotal);
				});
			});
		});
		
		Promise.all(promises).then(function(tt){
			var o = new Order ({
				clientId: req.session.nbcooking,
				priceTotal: priceTotal,
				cart: req.session.cart
			});

			o.save(function(err, order) {
				if (err) throw err;
			});
		});
	}
};

module.exports = Orders;