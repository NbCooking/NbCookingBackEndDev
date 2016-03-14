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
        
        
User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err;
    if(user){console.log('Ya!');res.render('users/subscribe');}
    else{
        var userDatas = new User ({
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address        
        });

        userDatas.save(function(err, user){
            if(err){console.log(err)}
            //console.log(user);
        });
        //var test = User.findOne({_id: userDatas._id}, function(err, data){console.log(data.age);});
        User.findById(userDatas._id, function(err, user){
            if(err) consoel.log(err);
            res.render('users/subscribed', {user: user.firstName, datas: user.email});
        })
    }
});

        
        
                
        
        
    }           
};
module.exports = Users;

 