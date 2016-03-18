require('../models/Offer');
require('../models/User');
var request = require('request');
var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var dateFormat = require('dateformat');
var User = mongoose.model('User');
var nbDest = 0;

var Offers = {
    
    
    search: function(req, res) {
        
        var dateNow = dateFormat(Date(), 'yyyy-mm-dd');
        
        urlConvert = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '+France&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw'
        request(urlConvert, function(err, result, body){
            var parsedBody = JSON.parse(body);
            lat = parsedBody['results'][0]['geometry']['location']['lat'];
            long = parsedBody['results'][0]['geometry']['location']['lng'];
            //latitude: {$gt: lat-0.0068, $lt: lat+0.0068}, longitude:{$gt: long-0.0045, $lt: long+0.0045}
            Offer.find({latitude: {$gt: lat-0.0068, $lt: lat+0.0068}, longitude:{$gt: long-0.0045, $lt: long+0.0045}, date : dateNow}, function(err, offer){
                if(err) throw err;
                var offersResult = offer;
                var destination = '';
                var nb = 0;
                offersResult.forEach(function(entry){
                    destination += entry['latitude']+','+entry['longitude']+'|';
                    nb += 1;
                });
                nbDest = nb;
                var destinations = destination.slice(0,-1);
                console.log(destinations);
                var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +lat+','+long+'&destinations='+destinations+'&key=AIzaSyAWihThbxq1bdTHT9Aq8IfscN4s_q1o6nw'
                request(url, function(err, result, body){
                    var parsedBody =JSON.parse(body);
                    var resultDest = [];
                    for(var i=0; i<nbDest; i++){
                            resultDest.push({
                            picture: offersResult[i].picture,
                            createAt: offersResult[i].createAt,
                            __v: offersResult[i].__v,
                            longitude: offersResult[i].longitude,
                            latitude: offersResult[i].latitude,
                            distance: parsedBody['rows'][0]['elements'][i]['distance']['value'],
                            date: offersResult[i].date,
                            price: offersResult[i].price,
                            description: offersResult[i].description,
                            title: offersResult[i].title,
                            cookId: offersResult[i].cookId,
                            _id: offersResult[i]._id
                        });
                        //console.log(resultDest);
                    };
                    console.log(resultDest);
                    res.render('offers/offers', {nbDest: nbDest, data: resultDest,});
                    
                });
                
            });
            
        });
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
