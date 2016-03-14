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
        
        
        var userDatas ={
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address        
        };
        
        
        var user = new User(userDatas);
        test = this.User.find({id: user._id}).select(email);
        user.save();
        tests = this.User.find({id: user._id}).select(email);
        res.render('users/subscribed', {user: tests, datas: test});
    }
    
        
    
};
module.exports = Users;

 