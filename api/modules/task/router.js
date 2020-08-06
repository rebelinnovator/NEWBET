var express = require('express')
var router = express.Router()
var task = require('./ctl_task.js')

//for admin only
router.get('/type',task.getType)
router.post('/type',task.postType)

//for user
router.get('/tasktype',task.getTypeForUser)
router.post('/nowtask',task.setNowTask)

router.get('/mytask',task.getAllMyTasks)
router.post('/giveup',task.giveup)
module.exports = router;

//for user