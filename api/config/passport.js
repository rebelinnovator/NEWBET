var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AccountSchema = require('../modules/schemas/account_schema.js');
var bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'phonenumber'
  },
  function(phonenumber, password, done) {
   // console.log(phonenumber + ':' + password);
    AccountSchema.findOne({ phonenumber: phonenumber }, function (err, user) {
    //  console.log(phonenumber);
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          phonenumber: 'phonenumber is wrong!'
        });
      }
      // Return if password is wrong
      if (user && !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {
          password: 'Password is wrong!'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));