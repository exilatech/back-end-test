
var mongoose = require('mongoose');
var Beer = require('../../models/beer');
var Promise = require('promise');

//Add Beer record
exports.addBeer = function (req, res) {
     var data = req.body;
     var rating = data["rating"];
     var name = data["name"];

    var requirement={
        "name":null,
        "type":null
    };

    for (var key in requirement) {
        if(!data[key] || data[key] == '' || data[key] == null) {
            return res.send({code: 400, message: "Please Enter " + key, success: false});
        }
    }

    var beerData = {
        "name":data["name"],
        "type":data["type"],
        "rating":0,
        "rating1":0,"rating2":0,"rating3":0,"rating4":0,"rating5":0
     };

     if(data["rating"] != null && isNaN(data["rating"]) != null){
        rating = Math.round(rating);
        if(rating > 5){
            rating = 5;
        }
        if(rating < 0){
            rating = 0;
        }

        beerData["rating"+rating] = 1;
        } else{
            rating = 0;
        }
        beerData["rating"] = rating;
     
       
        var beer = new Beer(beerData);

        beer.save().then(function (data) { 
                return res.send({ code: 400, message: 'Data successfully save.', success: data, error: null });
        },function (err) {
                if (err.code == 11000) {
                    return res.send({ code: 404, message: 'User already exists.', success: null, error: err });
                } 
                return res.send({ code: 404, message: 'Data save error.', success: null, error: err });
        });
    
};


// Updating ratings
exports.updateRating = function (req, res) {
     var data = req.body;
     var rating = data["rating"];
     var _id = data["id"];

    console.log('body',data);
    console.log('header ' , req.all);
    var requirement={
        "id":null
    };
    for (var key in requirement) {
        if(!data[key] || data[key] == '' || data[key] == null) {
            return res.send({code: 400, message: "Please Enter " + key, success: false});
        }
    }
     if(rating != null && Number.isNaN(rating) != null){
        rating = Math.round(rating);
        if(rating > 5){
            rating = 5;
        }
        if(rating < 0){
            rating = 0;
        }
        }else{
            return res.send({ code: 404, message: 'RYou have sent an incorrect rating value', success: null, error: null });
        }

            Beer.findOne(
                {'_id':_id}).then(
                function(doc){
                    {
                        if(doc){
                            doc['rating' + rating] = doc['rating' + rating] + 1;
                            doc.rating = (doc.rating1 + (doc.rating2 *2)+ (doc.rating3 * 3)+ (doc.rating4 * 4)+ (doc.rating5 * 5))/(doc.rating1 + doc.rating2 + doc.rating3 + doc.rating4 + doc.rating5);
                            doc.save().then(function (data) {
                                    return res.send({ code: 400, message: 'Data successfully updated.', success: data, error: null });
                            },function (err) {
                                    return res.send({ code: 404, message: 'Data updation error.', success: null, error: err });
                            });
                        }else{
                            return res.send({ code: 404, message: 'No record found', success: null, error: null });
                        }
                    }
                },function(err){
                        return res.send({ code: 404, message: 'Data updation error.', success: null, error: err });
                });
};


//getting Beer records
exports.getBeers = function (req, res) {
    var queryParams = req.query;
    // var queryParams = req.body;
    var querryString = queryParams["search"];
    console.log("querryString =" + querryString + ", queryParams=" + queryParams)
    if (querryString == null || querryString == ''){
        querryString = "";
    }
     querryString =  ".*" + querryString + ".*";
    Beer.find({"name":{$regex : querryString }}).then(function (data) {
            return res.send({ code: 400, message: 'Data successfully retrived.', success: data, error: null });
    },function (err ) {
            return res.send({ code: 404, message: 'Data retrived with error.', success: null, error: err });
    });
};
