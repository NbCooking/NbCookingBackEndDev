var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    email: {type: String, required: true, },
    password: {type: String, required: true},
    age: {type: Number, min: 16, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    phone: {type: Number, required: false},
    createAt: {type: Date, default: Date.now}
});   


exports.model = mongoose.model('User', user, 'users');