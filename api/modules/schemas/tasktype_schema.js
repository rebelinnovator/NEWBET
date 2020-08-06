var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var TasktypeSchema = new Schema({
    taskType:{
        type:Number,
        required:true
    },
    referralAmount:{
        type:Number,
        default:1
    },
    taskBonus:{
        type:Number,
        required:true
    },
    taskStatus:{
        type:String,//Going,//Finished
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    }


})
TasktypeSchema.plugin(autoIncrement.plugin,'data_task_types')
TasktypeSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_task_types',TasktypeSchema)