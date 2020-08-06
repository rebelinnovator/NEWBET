var express = require('express');
var router = express.Router();
var bank = require('./ctl_bank.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});

// game

router.get('/getbank',bank.getbank)
router.post('/setbank',bank.setbank)

router.post('/delbank',bank.delbank)

module.exports = router;