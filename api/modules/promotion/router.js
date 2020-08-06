var express = require('express')
var router = express.Router()
var promotion = require('./ctl_promotion.js')

//for admin only
router.post('/accept',promotion.acceptBonus)
router.get('/bonus',promotion.getBonus)
router.get('/promotions',promotion.getPromotions)
router.get('/getapplybonus',promotion.getApplyBonus)
router.post('/postapplybonus',promotion.postApplyBonus)
module.exports = router;

//for user