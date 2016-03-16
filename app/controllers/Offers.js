require('../models/Offer');
require('../models/User');
var request = require('request');
var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var User = mongoose.model('User');
var nbDest = 0;
var listDist = '';
var Offers = {
    
    
  search: function(req, res) {
      
      urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=APIKEY'
      request(urlConvert, function(err, result, body){
            var parsedBody = JSON.parse(body);
            //console.log(parsedBody['results'][0]['geometry']['location']);
            //console.log('---------------------------------------------------')
            lat = parsedBody['results'][0]['geometry']['location']['lat'];
            //console.log(lat);
            long = parsedBody['results'][0]['geometry']['location']['lng'];
            //console.log(long);
            
            User.find({}, function(err, user){
                var destination = '';
                var nb = 0;
                user.forEach(function(entry){
                    var test = entry;
                    destination += test['latitude']+','+entry['longitude']+'|';
                    nb += 1;
                });
                destination = destination.slice(0,-1);
                nbDest = nb;
                var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +lat+','+long+'&destinations='+destination+'&key=APIKEY';
                //console.log(url);
                request(url, function(err, result, body){
                    //console.log(body);
                    var parsedBody = JSON.parse(body);
                    
                    //console.log(parsedBody);
                    var list = '';
                    for(var i=0; i<nbDest; i++){
                        list += parsedBody['rows'][0]['elements'][i]['distance']['value']+',';
                    };
                    listDist = list.slice(0,-1);
                    //var distance = parsedBody['rows'][0]['elements'][0]['distance']['value'];
                    res.render('offers/offers', {title: 'Offers', test: listDist});
                    });
            });
      });
      
      
      
  },

    
    
  getOfferId: function(req, res) {  
    
  },
  addOfferId: function(req, res) {
      
      var offerDatas = new Offer ({
            cookId: req.body.cookId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            picture: req.body.picture,
            createAt: req.body.createAt,
            dateOfDeal: req.body.dateOfDeal
        });
        offerDatas.save(function(err, user){
            if(err){console.log(err)}
            //console.log(user);
        });

  },
    
    addOffer: function(req, res){
        res.render('/offers/addOffer');m
    }
};

module.exports = Offers;
