var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comment = new Schema({
  offerId: {type: String, required: true},
  cookId: {type: String, required: true},
  userId: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  mark: {type: Number, min: 1, max: 5 required: true},
  createAt: {type: Date, default: Date.now}
});

exports.model = mongoose.model('Comment', comment, 'comments');