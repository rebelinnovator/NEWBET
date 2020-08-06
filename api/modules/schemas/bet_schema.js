var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var oneBetSchema = new Schema({
    betTime:{
        type:Number,
        required:true
    },
    betNo:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    betType:{
        type:Number,
        required:true
    },
    betCardType:{
        type:Number,
        required:true
    },
    betCardAmount:{
        type:Number,
        required:true
    },
    betCardCount:{
        type:Number,
        required:true
    },
    betStatus:{
        type:Number,
        default:0//0:waiting 1: success 2: fail
    },
    betOrdered:{
        type:Boolean,
        requried:true
    }
    ,betResult:{
        type:Boolean
    },
    betDelevery:{
        type:Number
    },
    betFee:{
        type:Number
    },
    betAmount:{
        type:Number
    }
    },{
        usePushEach:true
})

oneBetSchema.plugin(autoIncrement.plugin, 'data_one_bet');
oneBetSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_one_bet', oneBetSchema);