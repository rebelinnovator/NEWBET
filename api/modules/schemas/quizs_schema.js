var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

autoIncrement.initialize(mongoose.connection);

var quizSchema = new Schema({
  title: String,
  question: String,
  answer: [],
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

quizSchema.plugin(autoIncrement.plugin, 'data_quizs');
quizSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_quizs', quizSchema);