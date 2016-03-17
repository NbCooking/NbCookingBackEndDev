require('../models/Offer');
require('../models/User');
var request = require('request');
var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var dateFormat = require('dateformat');
var User = mongoose.model('User');
var nbDest = 0;
var listDist = '';
var Offers = {
    
    
    search: function(req, res) {
        
        var dateNow = dateFormat(Date(), 'yyyy-mm-dd');
        var dateTomorrow = '2016-03-18';

        
        urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw'
        request(urlConvert, function(err, result, body){
            var parsedBody = JSON.parse(body);
            lat = parsedBody['results'][0]['geometry']['location']['lat'];
            long = parsedBody['results'][0]['geometry']['location']['lng'];
            
            
            //latitude: {$gt: lat-0.0068, $lt: lat+0.0068}, longitude:{$gt: long-0.0045, $lt: long+0.0045}
            Offer.find({latitude: {$gt: lat-0.0068, $lt: lat+0.0068}, longitude:{$gt: long-0.0045, $lt: long+0.0045}, date : dateFormat(Date(), 'yyyy-mm-dd')}, function(err, offer){
                if(err) throw err;
                var offersResult = offer;
                console.log(offersResult);
                });
            
            console.log(lat+','+long);
            //console.log(offer);
            });

        
          
            /*User.find({}, function(err, user){
                var destination = '';
                var nb = 0;
                user.forEach(function(entry){
                    var test = entry;
                    destination += test['latitude']+','+entry['longitude']+'|';
                    nb += 1;
                });
                destination = destination.slice(0,-1);
                nbDest = nb;
                console.log(nbDest);
                var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +lat+','+long+'&destinations='+destination+'&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw';
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
      });*/



    },



    getOfferId: function(req, res) {  

    },
    addOfferId: function(req, res) {
        console.log(req.session.nbcooking);
        
    User.findById(req.session.nbcooking, function(err, user){
        
          var offerDatas = new Offer ({
                cookId: req.session.nbcooking,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                picture: req.body.picture,
                date: req.body.date,
                latitude: user.latitude,
                longitude: user.longitude
            });
            offerDatas.save(function(err, offer){
                if(err){throw (err)}
                //console.log(user);
                res.render('offers/offer', {data: offer});
            });
        });    
    },
    
    addOffer: function(req, res){
        res.render('offers/addOffer');
        
    }
};

module.exports = Offers;
