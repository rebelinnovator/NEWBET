var AccountSchema = require('./account_schema.js');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var BankCard = new Schema({
    actualname:{
        type:String,
        required:true
    },
    ifsccode:{
        type:String,
        required:true
    },
    accountnumber:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    }, 
    city:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
   // userinfo: {type:Schema.Types.ObjectId, ref: AccountSchema.collection.name}
})
BankCard.plugin(autoIncrement.plugin,'data_bankcards')
BankCard.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_bankcards',BankCard)