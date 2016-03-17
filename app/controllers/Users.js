require('../models/User');


var mongoose = require('mongoose');
var User = mongoose.model('User');
var request = require('request');
var hash = require('password-hash');
var session = require('cookie-session');



var Users = {
    getAccount: function(req, res) {
        res.render('users/login')

    },
    login: function(req, res){
        console.log(req.body.email);
        console.log(req.body.password);
        User.findOne({email: req.body.email}, function(err, user){
            if(hash.verify(req.body.password, user.password)){
                //lancer session
                req.session.nbcooking = user._id;
                console.log(req.session.nbcooking);
                res.render('pages/index');
            }else{
                res.render('users/login', {info: 'Mauvais mot de passe ou mauvaise adresse mail'});
            }
        });
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
                    var urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw'
                    request(urlConvert, function(err, result, body){
                        if(err) throw err;
                        var parsedBody = JSON.parse(body);
                        lat = parsedBody['results'][0]['geometry']['location']['lat'];
                        long = parsedBody['results'][0]['geometry']['location']['lng'];
                        var password = hash.generate(req.body.password);
                        if (hash.verify(req.body.passwordConfirmation, password)){
                            var userDatas = new User ({
                                email: req.body.email,
                                password: password,
                                age: req.body.age,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                address: req.body.address,
                                latitude: lat,
                                longitude: long
                            });
                        
                            userDatas.save(function(err, user){
                                if(err){console.log(err)}
                                //console.log(user);
                            });
                            var test = User.findOne({_id: userDatas._id}, function(err, data){console.log(data.age);});
                            User.findById(userDatas._id, function(err, user){
                                if(err) throw err;
                                res.render('users/subscribed', {user: user.firstName, datas: user});
                        
                        });
                    }else{res.render('users/subscribe');}
                });
            }
            
        });   
    }


               
};
module.exports = Users;

 