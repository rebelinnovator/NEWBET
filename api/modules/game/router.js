var express = require('express');
var router = express.Router();
var bet = require('./ctl_bet.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});

// game
router.post('/bet', bet.post)
router.get('/bethistory',bet.gethistory)
router.get('/order',bet.getorder)
module.exports = router;