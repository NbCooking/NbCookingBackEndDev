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
          res.render('users/subscribe');

      },
    
 
    subscribe: function(req, res) {
        
        
        var userDatas = new User ({
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address        
        });
        
        userDatas.save(function(err, userDatas) {
        if (err) return console.error(err);
        console.dir(userDatas);
        });
    }
    
};
module.exports = Users;

 