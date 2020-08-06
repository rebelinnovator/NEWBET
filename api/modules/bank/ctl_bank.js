var BetSchema = require('../schemas/bet_schema.js');
var AccountSchema = require('../schemas/account_schema.js');
var BetResult = require('../schemas/betResult_schema.js');
var PromotionBonus = require('../schemas/promotionBonus_schema.js');
var BankCardSchema = require('../schemas/bankcard_schema.js');
var OtpService = require('../OtpService.js');

module.exports.getbank = async function(req,res){

    try{
        var user = await AccountSchema.findOne({
            _id:req.query.userId
        })
        if(user){
            if(user.bankcard != -1){
                var card = await BankCardSchema.findOne({
                    _id     :   user.bankcard
                })
                if(card)
                {
                    res.status(200).json({
                        bank:card
                    })    
                }else
                {        
                    console.log(err)
                    res.status(401).json({success:false})    
                }
            }
            else{
                res.status(200).json({
                    bank:-1
                })
            }
            

        }else
        {
            console.log(err)
            res.status(401).json({success:false})    
        }
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}

module.exports.setbank = async function(req,res){
    try{
        console.log(req.body.params)
        if(OtpService.checkOtp(req.body.params.bank.otpsession,req.body.params.bank.verficationnumber)){
            console.log("good")
            var user = await AccountSchema.findOne({
                _id:req.body.params.userId
            })

            var bank = await BankCardSchema.create(req.body.params.bank)
            if(!(user.bankcard == -1 || user.bankcard == undefined)){
                await BankCardSchema.deleteOne({
                    _id:user.bankcard
                })
            }
            user.bankcard = bank._id
            await user.save()
            
            res.status(200).json({
                bank    :bank,
                success :true,
                msg     :"setting BankCard success"
            })
        }else
        {
            console.log(err)
            res.status(201).json({
                success :false,
                msg     :"OTP session is wrong"    
            })    
        }
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}
module.exports.delbank = async function(req,res){
    try{
        console.log(req.body.params)
        var user = await AccountSchema.findOne({
            _id:req.body.params.userId
        })
    //    console.log(user)
     //   console.log(user.bankcard)
        await BankCardSchema.deleteOne({
            _id:user.bankcard
        })
        user.bankcard = -1
        await user.save()
        
        res.status(200).json({
            result:'success'
        })

    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}