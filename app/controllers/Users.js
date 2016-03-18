require('../models/User');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var request = require('request');
var hash = require('password-hash');
var session = require('cookie-session');



var Users = {
    getAccount: function(req, res) {
        if(req.session.nbcooking){res.redirect('/profile')}
        else{res.render('users/login')}
        

    },
    login: function(req, res){
        if(!req.body.password) res.redirect('/login');
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
              throw err;
            } 
            if(user && hash.verify(req.body.password, user.password)){
                //lancer session
                req.session.nbcooking = user._id;
                console.log(req.session.nbcooking);
                res.redirect('/');
            }else{
                res.render('users/login', {info: 'Mauvais mot de passe ou mauvaise adresse mail'});
            }
        });
    },
    disconnect: function(req, res){
        req.session.nbcooking == null;
        res.redirect('/');
    },
    
    getProfile: function(req, res) {
        console.log(req.session.nbcooking);
        if(!req.session.nbcooking){
            res.redirect('/login');
        }else{
            User.findById(req.session.nbcooking, function(err, user){
                res.render('users/privateProfile', {firstName: user.firstName, lastName: user.lastName, address: user.address, phone: user.phone, email: user.email, age: user.age});
            });
        }
        
        
        
    },
    
    updateProfile: function(req, res) {
        
        User.findById(req.session.nbcooking, function(err, user){
            if(err) throw err;
            if(req.body.oldPassword && hash.verify(req.body.oldPassword, user.password)){
                console.log('pass')
                if(req.body.address){
                    console.log('pass address');
                    var urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw'
                    request(urlConvert, function(err, result, body){
                        if(err) throw err;
                        var parsedBody = JSON.parse(body);
                        lat = parsedBody['results'][0]['geometry']['location']['lat'];
                        long = parsedBody['results'][0]['geometry']['location']['lng'];
                        user.address = req.body.address;
                        user.latitude = lat;
                        user.longitude = long;
                    });
                }
                if(req.body.password){
                    console.log(req.body.password);
                    var password = hash.generate(req.body.password);
                    console.log(password);
                    if(hash.verify(req.body.passwordConfirmation, password)){
                        console.log('pass password')
                        user.password = password;
                        req.session = null;
                    }else{
                    res.render('users/privateProfile', {firstName: user.firstName, lastName: user.lastName, address: user.address, phone: user.phone, email: user.email, age: user.age, info: 'Mauvais mot de passe'});
                    }
                }
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.phone = req.body.phone;
                user.email = req.body.email
                user.save();
            }
            res.redirect('/profile')
        });
        
       
    },
    getProfileId: function(req, res) {
        User.findById(idURl, function(err, user){
            res.render('users/publicProfile', {firstName: user.firstName})
        });
        
    },
    form: function(req, res) {
        if(req.session.nbcooking){res.redirect('/profile')}
        else{res.render('users/subscribe')}
      
    },
    
 
    subscribe: function(req, res) {

        User.findOne({email: req.body.email}, function(err, user){
                if(err) throw err;
                if(user){res.render('users/login');}
                else{
                    if(!req.body.firstName || !req.body.lastName || !req.body.age || !req.body.address){res.redirect('/subscribe')}
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
                                res.redirect('/profile');
                        
                        });
                    }else{res.redirect('/subscribe');}
                });
            }
            
        });   
    }


               
};
module.exports = Users;

 