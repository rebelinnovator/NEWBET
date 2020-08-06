var AccountSchema = require('../schemas/account_schema.js');
var TaskSchema = require('../schemas/task_schema.js')
var PromotionBonus = require('../schemas/promotionBonus_schema.js')
var FinancialSchema = require('../schemas/financial_schema.js');

var jwt = require('jsonwebtoken');
var OtpService = require('../OtpService.js');

var bcrypt = require('bcryptjs');
const request = require('request');
var otpSession = []

function checkOtp(phonenumber,otp)
{
//    phonenumber = '8615304068874'
    return true
    console.log(phonenumber)
    console.log(otpSession)
    var otpitem = otpSession.find((item) => item.phonenumber === phonenumber)
    console.log(otpitem)
    if(otpitem != undefined)
    {

        var options = {
            method: 'GET',
           url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/VERIFY/' + otpitem.sessionId +'/'+ otp,
           headers: { 'content-type': 'application/x-www-form-urlencoded' },
           form: {} 
       }
       console.log(options)
       //return true;
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
                /*
                 res.json({
                    code: 50,
                    msg: 'Generated verification code unsuccessfully',
                    tip: 'Please click OTP button again'
                })
                */
               return false
            }
            console.log(body)
            /*
             res.json({
                code: 200,
                sessionId: body.Details,
                msg: 'Generated verification code successfully',
                tip: 'Please check your phone.'
            })
            */
           return true
        })
    }
    return false
}

module.exports.register = async function (req, res) {
    try {
        console.log(req.body)
        console.log("HAHAH")
        let canOtp = await OtpService.checkOtp(req.body.otpsessionId,req.body.otpnumber)
        console.log(canOtp)
        if(canOtp == true){
        
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            console.log(req.body.nickname)
            var userInfo = {
                phonenumber         :req.body.phonenumber,
                nickname            :req.body.nickname,
                password            :hash,
                balance             :500,
                referral_code       :req.body.recomnumber,
                invite_code         :Date.now(),                
                account_status      :'Active',
                token               :Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }

            var accountDoc = await AccountSchema.findOne({'phonenumber': userInfo.phonenumber});
            if (accountDoc == null) {
                console.log(req.body.recomnumber)
                var referralUser = await AccountSchema.findOne({'invite_code':req.body.recomnumber})
               // console.log(referralUser)
                if(referralUser != null){
                    accountDoc = await AccountSchema.create(userInfo);

                    //complet referaluser's task
                    console.log(referralUser._id)
                    referralTask = await TaskSchema.findOne({
                        userId      :   referralUser._id,
                        status      :   0
                    }).populate({
                        path: 'taskTypeId',
                    })
                    if(referralTask){
                        referralTask.referralUsers.unshift(accountDoc._id)
                        console.log(referralTask.referralUsers.length)
                        if(referralTask.referralAmount == referralTask.referralUsers.length)
                        {
                            referralTask.status = 2//complete Task and success
                            referralTask.deadTime = Date.now()
                            //should be moved when user recharged
                            await PromotionBonus.create({
                                bonusType           :   0,
                                sender              :   accountDoc._id,
                                receiver            :   referralUser._id,
                                betPeriod           :   -1,
                                betType             :   -1,
                                balance             :   referralTask.taskTypeId.taskBonus,
                                promotionLevel      :   1,
                                status              :   0,
                                createtime          :   Date.now()
                            })
                            referralUser.bonus += referralTask.taskTypeId.taskBonus
                            await referralUser.save()
                            /*
                            await FinancialSchema.create({
                                createTime      :   Date.now(),
                                financialType   :   "register",
                                amount          :   referralTask.taskTypeId.taskBonus,
                                userId          :   referralUser._id
                            })
                            */
                        }
                        
                        await referralTask.save()
                    }
                    //
                    
                    //PromotionBonus
                    //
                    console.log("User is registered");
                    //res.status(200).json({success: true, doc: accountDoc});
                    res.status(200).json({success: true, msg:"user is registered"});
                }else
                {
                 //   console.log(error);
                    res.status(201).json({success: false, error:{recomnumber: "referral number is incorrect"}});            
                }
            } else {
                console.log("User is alread exist");
                res.status(201).json({success: false, error:{phonenumber: "This number is already registered!"}});
            }
        }else{
            console.log("OTP is missing");
            res.status(201).json({success:false,error:{otpnumber: "OTP is incorrect"}});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}
module.exports.otp = function (req, res) {
    console.log("@34234")
    const phone = req.body.phonenumber
    console.log(phone)
     // url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+91' + phone + '/AUTOGEN',
    
    var options = {
         method: 'GET',
        url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+' + phone + '/AUTOGEN',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {} 
    }
    console.log(options)
    console.log("HI")
    request(options, (error, response, body) => {
        if (error) {
            console.log(error)
             res.json({
                code: 50,
                msg: 'Generated verification code unsuccessfully',
                tip: 'Please click OTP button again'
            })
        }
        
            console.log("Overcom")
            console.log(body)
            var a = JSON.parse(body);
            console.log(a.Details)
            if(JSON.parse(body).Status != "Error"){

                otpSession = otpSession.filter((item)=>item.phonenumber!=phone)
                otpSession.push({
                    phonenumber:phone,
                    sessionId:JSON.parse(body).Details
                })
                
                console.log(otpSession)
                res.json({
                    code: 200,
                    sessionId: body.Details,
                    msg: 'Generated verification code successfully',
                    tip: 'Please check your phone.'
                })
                
            }else
            {
                res.json({
                    code: 50,
                    msg: 'Generated verification code unsuccessfully',
                    tip: 'Please click OTP button again'
                })
            }
    })
    
    
}