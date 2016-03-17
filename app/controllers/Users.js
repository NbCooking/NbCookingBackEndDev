require('../models/User');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var Users = {
  getAccount: function(req, res) {
    
  },
  getProfile: function(req, res) {
    
  },
  getProfileId: function(req, res) {
    
  },
  form: function(req, res) {
    
  },
  subscribe: function(req, res) {
    
  },
	
	/**
		* Test methods
		*/
	get: function(req, res) {
		User.find({}, function(err, users) {
			if (err) throw err;
			console.log(users);
		});
	},
	post: function(req, res) {
		/*var u = new User({
			email: 'victor.gabou@outlook.fr',
			password: 'testest',
			age: 20
		});
		
		u.save(function(err) {
			if (err) throw err;
			console.log('User inserted');
		});*/
		User.findById('56e6d95617f0aa4c1f3b9ae9', function (err, user) {
			if (err) throw err;
			
			user.password = 'testest2';
			
			user.save(function (err) {
				if (err) throw err;
				
				console.log('User successfully updated!');
			});
		});
	}
}


module.exports = Users;