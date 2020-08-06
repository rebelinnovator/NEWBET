var express = require('express');
var router = express.Router();
var _activity = require('./ctl_activity.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});


router.post('/finish', _activity.finish);
router.post('/get/user', _activity.getUserActivity);
router.post('/get/course', _activity.getCourseActivity);

module.exports = router;