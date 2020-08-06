var AccountSchema = require('./account_schema.js');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
var SchemaTypes = mongoose.Schema.Types;
var ApplyBonus = new Schema({
    userId:{
        type:Number, ref: AccountSchema.collection.name
    },
    applyAmount:{
        type:Number,
        required:true
    },
    realAmount:{
        type:Number,
        default:0
    },
    applyState:{
        type:Number,
        default:0//0:pending	1:cancel(by user)	2:dismiss(by admin) 	3:success but is not equal applyAmount	4:success
    },
    msg:{
        type:String,
    }, 
    applyTime:{
        type:Date,
        required:true
    },
    acceptTime:{
        type:Date,
    },
   // userinfo: {type:Schema.Types.ObjectId, ref: AccountSchema.collection.name}
})
ApplyBonus.plugin(autoIncrement.plugin,'data_applybonus')
ApplyBonus.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_applybonus',ApplyBonus)