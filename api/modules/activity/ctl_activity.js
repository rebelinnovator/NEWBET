var ActivitySchema = require('../schemas/activity_schema.js');
var jwt = require('jsonwebtoken');

module.exports.finish = function (req, res) {
  	var record = {
	    userId : req.body.userId,
	    courseId : req.body.courseId,
	    contentId : req.body.contentId
	}

    ActivitySchema.findOne(record, async function (err, doc) {
    	if (err) {
    		res.status(201).json({success: false});
    		return;
    	}
    	if (!doc) {
    		await ActivitySchema.create(record);
    	} else {
    		record.modified_at = Date.now();
    		await ActivitySchema.update({'_id': doc._id}, record);
    	}
    	res.status(201).json({success: true, doc: doc});
    });
}

module.exports.getUserActivity = function (req, res) {
    ActivitySchema.find({userId: req.body.userId}, async function (err, doc) {
    	if (err) {
    		res.status(201).json({success: false});
    		return;
    	}
    	
    	var data = {};
    	doc.forEach((val) => {
    		if (typeof(data[val.courseId]) !== "object") {
    			data[val.courseId] = [];
    		}
    		if (data[val.courseId].indexOf(val.contentId) === -1) {
    			data[val.courseId].push(val.contentId);
    		}
    	})

    	res.status(201).json({success: true, data: data})
    });
}

module.exports.getCourseActivity = function (req, res) {
    ActivitySchema.find({ userId: req.body.userId, courseId: req.body.courseId }, function (err, doc) {
    	if (err) {
    		res.status(201).json({success: false});
    		return;
    	}
    	res.status(201).json({success: true, doc: doc});
    });
}

