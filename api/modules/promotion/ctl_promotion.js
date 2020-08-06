var PromotionSchema = require('../schemas/promotionBonus_schema.js');
var AccountSchema = require('../schemas/account_schema.js');
var ApplyBonusSchema = require('../schemas/applyBonus_schema.js');

module.exports.getPromotions = async function(req,res){
    try{
        
        var levelones = await AccountSchema.find({
            referral_code        :   req.query.invite_code
        })

        var leveltwos = []
        
        const promises = levelones.map(async(levelone)=>{
      
            var leveltwo = await AccountSchema.find({
                referral_code       :   levelone.invite_code
            })
         
            leveltwos = [...leveltwos,...leveltwo]
        }) 
        await Promise.all(promises)

        console.log(leveltwos.length)
        res.status(200).json({
            promotions: {
                levelones   :   levelones,
                leveltwos   :   leveltwos
            }
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})
    }
}

module.exports.getBonus = async function(req,res){
    console.log("BONSU")
    try{
        var bonus = await PromotionSchema.find({
            receiver        :   req.query.id
        }).populate({
            path: 'sender',
        })
        console.log(bonus.length)
        res.status(200).json({
            bonus: bonus
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})
    }
}

module.exports.getApplyBonus = async function(req,res){
    console.log("apply")
    try{

        var applybonus = await ApplyBonusSchema.find({
            userId      :   req.query.userId
        })

       
        res.status(200).json({
            applybonus: applybonus
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})
    }
}
module.exports.postApplyBonus = async function(req,res){
    console.log("JEER")
    try{
        //req.query.userId
        //req.query.submitAmount
        /*
        var c = req.body
        console.log(c)
        console.log(c.userId)
        console.log(JSON.parse(req.body))
        console.log(req.params)
        */
        var user = await AccountSchema.findOne({
            _id     :   req.body.params.userId
        })
        if(user){
            console.log(user)
            console.log(user.todaySubmitBonus)
            console.log(user.bonus)
            if(user.todaySubmitBonus == 0){
                await ApplyBonusSchema.create({
                    userId          :   req.body.params.userId,
                    applyAmount     :   req.body.params.submitAmount,
                    applyTime       :   Date.now()
                })
                user.todaySubmitBonus = 1
                await user.save()
                res.status(200).json({
                    applySubmitted  :   true,
                })
            }else
            {
                res.status(200).json({
                    result          :   false,
                    applySubmitted  :   true
                })

            }
        }else
        {
            res.status(401).json({result:false})
        }
    }catch(err)
    {
        console.log(err)
        res.status(401).json({result:false})
    }
}
module.exports.getUnAccept = async function(req,res){
    try{
        var user = req.body.id
  //      console.log(req.query.id)
    //    console.log(req.body)
      //  console.log(req)
      //  console.log(user)
        var promotions = await PromotionSchema.find({
            receiver        :   req.query.id,
            status          :   0,
           
        }).populate({
            path: 'sender',
        })

    
        res.status(200).json({
            promotions: promotions
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})
    }
}
module.exports.acceptBonus = async function(req,res){
    try{
        
       console.log(req.body)
        var userId = req.body.params.userId
        var level = req.body.params.level
        
        console.log(userId)
       

        var promotions = await PromotionSchema.find({receiver:userId,promotionLevel:level,status:0})
        console.log(promotions.length)
        var totalBonus = 0
        promotions.map(async (item)=>{
            totalBonus += item.balance
            item.status = 1
            await item.save()
        })
        console.log(totalBonus)
        var user = await AccountSchema.findOne({_id:userId})

        user.balance += totalBonus * (level == 1 ? 0.03:0.015)
                     
        await user.save()
        var repromotions = await PromotionSchema.find({
            receiver        :   userId,
            status          :   0,
           
        }).populate({
            path: 'sender',
        }) 

        res.status(200).json({
            result:'success',
            promotions: repromotions
        })
        
    }catch(err)
    {
        console.log(err)
        res.status(201).json({result:'failed'})//must fix
    }
}