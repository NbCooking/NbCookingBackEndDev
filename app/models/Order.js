var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var Schema = mongoose.Schema;

var order = new Schema({
  clientId: {type: String, required: true},
  priceTotal: {type: Number, required: true},
  createAt: {type: Date, default: dateNow},
	cart: {type: [Schema.Types.ObjectId], require: true}
});

exports.model = mongoose.model('Order', order, 'orders');