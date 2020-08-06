var express = require('express');
var router = express.Router();
var _courses = require('./ctl_courses.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Auth Time: ', Date.now());
  next();
});


router.get('/quizs', _courses.getQuizs);
router.get('/get', _courses.getCourses);
router.get('/contents', _courses.getCourseById)
router.post('/setimage', _courses.setCoverImage)
router.post('/remove', _courses.removeCourse)
router.post('/contents/save', _courses.updateOrNew);
router.post('/contents/add', _courses.updateOrNewContent);
router.post('/contents/remove', _courses.removeContent);

module.exports = router;