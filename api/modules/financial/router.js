var express = require('express');
var router = express.Router();
var financial = require('./ctl_financial.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});

// game
//router.post('/bet', bet.post)
router.get('/',financial.getAll)

module.exports = router;