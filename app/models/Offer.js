var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var offer = new Schema({
  cookId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  picture: {type: String, default: '/public/images/offers/offer.png'},
  date: {type: String, required: true},
  latitude: {type: String, required: true},
  longitude: {type: String, required: true},
  createAt: {type: Date, default: Date.now}
});

exports.model = mongoose.model('Offer', offer, 'offers');