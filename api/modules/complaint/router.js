var express = require('express');
var router = express.Router();
var complaint = require('./ctl_complaint.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});

// game

router.post('/',complaint.addComplaints)
router.get('/',complaint.getComplaints)


module.exports = router;