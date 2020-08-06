//var TasktypeSchema = require('./tasktype_schema.js');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var Task = new Schema({
    taskTypeId:{
        type:Number, ref: "data_task_types"
    },
    userId:{
        type:Number,
        required:true
    },
    referralAmount:{
        type:Number,
        default:0
    },
    referralUsers:{
        type:[Number],
        default:[]
    },
    startTime:{
        type:Date
    },
    endTime:{
        type:Date
    },
    deadTime:{
        type:Date
    },
    status:{
        type:Number,
        default:0
        //0 doing
                    //1 complet but not accept
                    //2 complte and success
                    //3 finished by time
                    //4 give up
    }
})
Task.plugin(autoIncrement.plugin,'data_tasks')
Task.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_tasks',Task)