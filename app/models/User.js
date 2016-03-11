var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  age: {type: Number, min: 16, required: true},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  address: {type: String, required: false},
  createAt: {type: Date, default: Date.now}
});

exports.model = mongoose.model('User', user, 'users');