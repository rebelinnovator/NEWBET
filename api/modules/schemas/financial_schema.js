var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var Financial = new Schema({
    createTime:{
        type:Date,
        required:true
    },
    financialType:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    }
    
})
Financial.plugin(autoIncrement.plugin,'data_financials')
Financial.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_financials',Financial)