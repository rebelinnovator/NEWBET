var AccountSchema = require('../schemas/account_schema.js');
var ActivitySchema = require('../schemas/activity_schema.js');
var CourseSchema = require('../schemas/courses_schema.js');
var QuizSchema = require('../schemas/quizs_schema.js');
var jwt = require('jsonwebtoken');
var fs = require('fs')

function intersect(a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
  return a.filter(function (e) {
      return b.indexOf(e) > -1;
  });
}

async function getRecommend( userId, limit ) {
  var user = await AccountSchema.findOne({ '_id': userId });
  var courses = await CourseSchema.find();
  var quiz = [];
  var ret = [];

  user.quiz.map((q, idx) => {
    if (q >= 50) {
      quiz.push(idx+1)
    }
  })

  if (!quiz.length) {
    quiz = courses;
  }

  courses.map(course => {
    var common = intersect(quiz, course.quizs);
    if (!common.length) return;
    ret.push(course);
  })

  return limit === -1 ? ret : ret.slice(0, limit);
}

module.exports.getCourses = async function (req, res) {
  var mode = req.query.mode;

  if ( mode === 'all' ) {

    CourseSchema.find( {} , function (err, doc) {
      if (err) {
          console.log(err);
          res.status(201).json({success: false, message: err});
          return;
      }
      res.status(201).json({success: true, doc: doc});
    });

  } else if ( mode === 'recent-uploaded' ) {

    var doc = await CourseSchema.find().sort({
      "modified_at": -1
    }).limit(req.query.limit ? req.query.limit : 10);
    res.status(201).json({success: true, doc: doc})

  } else if ( mode === 'continue-watch' ) {

    ActivitySchema.find({userId: req.query.userId}, async function (err, doc) {
      if (err) {
        res.status(201).json({success: false});
        return;
      }
      
      var data = [];
      doc.forEach((val) => {
        if (data.indexOf(val.courseId) === -1) {
          data.push(val.courseId);
        }
      })

      CourseSchema.find({"_id" : { $in : data }}, function (err, doc) {
        if (err) {
          res.status(201).json({success: false});
          return;
        }
        res.status(201).json({success: true, doc: doc})
      })      
    });

  } else if ( mode === 'recommended' ) {

    var data = await getRecommend(req.query.userId, -1);
    res.status(201).json({success: true, doc: data})
    
  } else if ( mode === 'home' ) {

    var data = {};
    data.recent = await CourseSchema.find().sort({
      "modified_at": -1
    }).limit(4);
    data.recommended = await getRecommend(req.query.userId, 4);
    data.all = await CourseSchema.find().limit(8);

    ActivitySchema.find({userId: req.query.userId}, async function (err, doc) {
      if (err) {
        res.status(201).json({success: false});
        return;
      }
      
      var indexes = [];
      doc.forEach((val) => {
        if (indexes.indexOf(val.courseId) === -1) {
          indexes.push(val.courseId);
        }
      })

      if (!indexes.length) {
        data.continue = [];
        return res.status(201).json({success: true, data: data})
      }
      if (!indexes.length > 4) {
        indexes.slice(indexex.length - 4);
      }

      CourseSchema.find({"_id" : { $in : indexes }}, function (err, d) {
        if (err) {
          res.status(201).json({success: false});
          return;
        }
        data.continue = d;
        res.status(201).json({success: true, data: data})
      })      
    });

  }
}

module.exports.getCourseById = function (req, res) {
  CourseSchema.findOne({'_id': req.query.courseId}, function (err, doc) {
    if (err || !doc) {
      res.status(201).json({success: false});
      return;
    } else {
      res.status(201).json({success: true, data: doc})
    }
  })
}


module.exports.updateOrNew = async function (req, res) {
  var data = req.body;
  var doc = '';
  if (data._id === '') {
    CourseSchema.create(data, function(err, doc) {
      res.status(201).json(doc);   
    });
  } else {
    CourseSchema.update({'_id': data._id}, data, function(err, doc) {
      res.status(201).json(data);
    });
  }
}


module.exports.setCoverImage = function (req, res) {
  var data = {
    coverimage: req.body.file.filename,
    modified_at: Date.now()
  };
  CourseSchema.update({'_id': req.body.courseId}, data, async function (err, doc) {
    if (err) {
      return res.status(201).json({success: false});
    }
    res.status(201).json({success: true, doc: doc});
  });
}

module.exports.removeCourse = function (req, res) {
  CourseSchema.findOne({'_id': req.body.courseId}, function (err, doc) {
    if (err) {
      return res.status(201).json({success: false});
    } 
    doc.remove(function (err, d) {
        if (err) {
            return res.status(201).json({ success: false,  message: 'Error deleted' });
        }
        try {          
            fs.unlinkSync(__dirname+'/../../public/uploads/'+req.body.courseId);
        } catch (e) {

        }
        
        res.status(201).json({ success: true, message: 'Successfully deleted' });
    });
  });
}

module.exports.updateOrNewContent = function (req, res) {
  var data = req.body;
  CourseSchema.findOne({'_id': data.courseId}, async function (err, doc) {
    if (err) {
      res.status(201).json({success: false});
      return;
    }
    var resT = [];
    var append = true;
    await doc.contents.forEach(function(content, err) {
      if (content._id === data._id) {
          if (data.file) {
            content = data;
          } else {
            content.name = data.name;
            content.description = data.description;
          }
          append = false;
      }
      resT.push(content);
    });

    if (append) {
      resT.push(data);
    }

    doc.contents = resT;
    CourseSchema.update({_id: doc._id}, doc, function (err, doc) {
        if (err) {
            res.status(201).json({success: false, error: err});
        } else {
            res.status(201).json({success: true, doc: doc});
        }
    })
  })
}

module.exports.removeContent = function (req, res) {
  var data = req.body;
  CourseSchema.findOne({'_id': data.courseId}, async function (err, doc) {
    if (err) {
      res.status(201).json({success: false});
      return;
    }
    var resT = [];
    await doc.contents.forEach(function(content, err) {
      if (content._id === data._id) {
        return;
      }
      resT.push(content);
    });

    doc.contents = resT;
    CourseSchema.update({_id: doc._id}, doc, function (err, doc) {
        if (err) {
            res.status(201).json({success: false, error: err});
        } else {
            res.status(201).json({success: true, doc: doc});
        }
    })
  })
}

module.exports.getQuizs = async function (req, res) {
  var data = await QuizSchema.find();
  res.status(201).json({success: true, data: data});
}