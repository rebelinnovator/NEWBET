var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var BetResultSchema = new Schema({
    betTimePeroid:{
        type:Number,
        required:true
    },
    betDisplayTime:{
        type:String,
        required:true
    },
    betType:{
        type:Number,
        required:true
    },
    betPrice:{
        type:Number,
        required:true
    },
    betNumber:{
        type:Number,
        rquired:true
    },
    betColor:{
        type:Number,
        required:true
    }
    },{
        usePushEach:true
})

BetResultSchema.plugin(autoIncrement.plugin, 'data_bet_result');
BetResultSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_bet_result', BetResultSchema);