var express = require('express');
var router = express.Router();
var _read = require('./ctl_login.js');
var _account = require('./ctl_account.js')
var _register = require('./ctl_register.js');
//var _otpService = require('./OtpService.js');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});

// Login
router.post('/login', _read.login);
router.get('/access-token/:access_token', _read.access_token);

// Register
router.post('/register', _register.register);
router.post('/otp',_register.otp)

router.post('/user/update', _account.update);
router.post('/user/checkpwd', _account.checkPassword);
router.post('/user/updatepwd', _account.updatePassword);

// Manage Accounts
router.get('/getAllAccountData', _account.getAllAccountData)

router.get('/getActiveAccountData', _account.getActiveAccountData);
router.get('/getInactiveAccountData', _account.getInactiveAccountData);
router.get('/getClosedAccountData', _account.getClosedAccountData);
router.get('/getRestrictedAccountData', _account.getRestrictedAccountData);

router.post('/updateAccountData', _account.updateAccountData);
router.post('/removeAccountData', _account.removeAccountData);
router.post('/removeAccountsData', _account.removeAccountsData);

router.post('/getAccountDataById', _account.getAccountDataById)

router.post('/addAccountData', _account.addAccountData);
router.post('/resetPassword', _account.resetPassword);

router.post('/contact', _account.addContact);
router.post('/setQuiz', _account.setQuiz)

module.exports = router;