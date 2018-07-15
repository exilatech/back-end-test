'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
//scrypt = require('md5');

var BeerSchema = new Schema({
   
    name:{type:String,unique:true},
    rating:{type:Number},
    type:{type:String},
    rating1:{type:Number},
    rating2:{type:Number},
    rating3:{type:Number},
    rating4:{type:Number},
    rating5:{type:Number}

    
});

var beer = mongoose.model("beer",BeerSchema);
module.exports = beer;
