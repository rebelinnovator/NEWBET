var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

autoIncrement.initialize(mongoose.connection);

var contactSchema = new Schema({
  userId: Number,
  subject: String,
  message: String,
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

contactSchema.plugin(autoIncrement.plugin, 'data_contacts');
contactSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('data_contacts', contactSchema);