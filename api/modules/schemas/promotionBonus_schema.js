var AccountSchema = require('./account_schema.js');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);


var PromotionBonus = new Schema({
    bonusType :{
        type:Number,    //0:referral 1:playing
        required:true
    },
    sender:{
        type:Number, ref: AccountSchema.collection.name
    },
    receiver:{
        type:Number,
        required:true
    },
    betPeriod:{
        type:Number,
        required:true
    },
    betType:{
        type:Number,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }, 
    promotionLevel:{
        type:Number,
        required:true
    },
    createtime:{
        type:Date,
        required:true
    },
    status:{
        type:Number,
        default:0//0:default 1:accept
    },
   // userinfo: {type:Schema.Types.ObjectId, ref: AccountSchema.collection.name}
})
PromotionBonus.plugin(autoIncrement.plugin,'data_promotionbonus')
PromotionBonus.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_promotionbonus',PromotionBonus)