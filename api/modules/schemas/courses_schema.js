var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var courseSchema = new Schema({
  name: String,
  slug: String,
  coverimage: String,
  description: String,
  quizs: [],
  contents: [],
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

courseSchema.plugin(autoIncrement.plugin, 'data_courses');
courseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_courses', courseSchema);