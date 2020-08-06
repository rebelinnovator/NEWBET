var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

autoIncrement.initialize(mongoose.connection);

var activitySchema = new Schema({
  userId: Number,
  courseId: Number,
  contentId: String,
  modified_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
},{
  usePushEach : true
});

activitySchema.plugin(autoIncrement.plugin, 'data_activities');
activitySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_activities', activitySchema);