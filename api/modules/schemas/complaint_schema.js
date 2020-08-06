var AccountSchema = require('./account_schema.js');

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var Complaint = new Schema({
    sender:{
        type:Number,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        default:'no Answer'
    },
    postdate:{
        type:Date,
        required:true
    },
    state:{
        type:Number,
        required:true   //0:waiting 1://answered
    }, 
    
   // userinfo: {type:Schema.Types.ObjectId, ref: AccountSchema.collection.name}
})
Complaint.plugin(autoIncrement.plugin,'data_complaints')
Complaint.plugin(passportLocalMongoose)
module.exports = mongoose.model('data_complaints',Complaint)