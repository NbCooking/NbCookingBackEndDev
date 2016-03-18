var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dateFormat = require('dateformat');
var dateNow = dateFormat(Date(), 'yyyy-mm-dd');


var offer = new Schema({
  cookId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  picture: {type: String, default: '/images/offer3.jpg'},
  date: {type: String, required: true},
  latitude: {type: String, required: true},
  longitude: {type: String, required: true},
  createAt: {type: Date, default: dateNow, require: true}
});

exports.model = mongoose.model('Offer', offer, 'offers');