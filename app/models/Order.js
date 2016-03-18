var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({
  clientId: {type: String, required: true},
  price: {type: Number, required: true},
  createAt: {type: Date, default: Date.now}
});

exports.model = mongoose.model('Order', order, 'orders');