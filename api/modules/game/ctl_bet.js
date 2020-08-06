var BetSchema = require('../schemas/bet_schema.js');
var AccountSchema = require('../schemas/account_schema.js');
var BetResult = require('../schemas/betResult_schema.js');
var PromotionBonus = require('../schemas/promotionBonus_schema.js');

var betInfo = []
var nowT = -100
module.exports.getBettingResult = function(callback){

    var result = []
    
    BetSchema.find({'betType':0},function(err,oneBets){
        console.log(oneBets)
    })

    callback(result)
}
module.exports.post = async function(req,res){
    console.log("bet")
    console.log(req.body.type)
    console.log(req.body.cardType)

    console.log(req.body.cardAmount)
    console.log(req.body.cardCount)
    console.log(req.body.user)
    try{
        var user = await AccountSchema.findOne({'_id': req.body.userId})
        if(user != null)
        {
            console.log("balance")
            console.log(user.balance)
            console.log(req.body.cardAmount * req.body.cardCount)
            console.log("balance")
            if(user.balance >= req.body.cardAmount * req.body.cardCount)
            {
                user.balance -= req.body.cardAmount * req.body.cardCount
                await user.save()
                var newBet = await BetSchema.create({
                    betTime:startNowTurnTime,
                    userId:user._id,
                    betNo:20200802154,
                    betType:req.body.type,
                    betCardType:req.body.cardType,
                    betCardAmount:req.body.cardAmount,
                    betCardCount:req.body.cardCount,
                    betOrdered:false
                })
                
                    console.log(newBet.betCardType)
                    if(newBet.betCardType <= 9)
                    {
                        console.log('number')
                        bettingGlobalResult[newBet.betType][0][newBet.betCardType] += newBet.betCardAmount * newBet.betCardCount
                    }else
                    {
                        console.log('clr')

                        bettingGlobalResult[newBet.betType][1][newBet.betCardType - 10] += newBet.betCardAmount * newBet.betCardCount
                    }
                console.log('newBetInserted')
                var waitingBets = await BetSchema.find({userId:user._id,betOrdered:false})
                /**bonus to promotion */
                var parent = await AccountSchema.findOne({'invite_code': user.referral_code})
                if(parent)
                {
                    await PromotionBonus.create({
                        bonusType   :   1,
                        sender      :   user._id,
                        receiver    :   parent._id,
                        betPeriod   :   100,//must fix,
                        betType     :   req.body.type,
                        balance     :   req.body.cardAmount * req.body.cardCount * 0.03,
                        promotionLevel  :   1,
                        createtime          :   Date.now()

                    })
                    parent.bonus += (req.body.cardAmount * req.body.cardCount) * 0.03
                    await parent.save()
                    var grandparent = await AccountSchema.findOne({'invite_code': parent.referral_code})
                    if(grandparent)
                    {
                        await PromotionBonus.create({
                            bonusType   :   1,
                            sender      :   user._id,
                            receiver    :   grandparent._id,
                            betPeriod   :   100,//must fix,
                            betType     :   req.body.type,
                            balance     :   req.body.cardAmount * req.body.cardCount * 0.015,
                            promotionLevel  :   2,
                            createtime          :   Date.now()

                        })
                        grandparent.bonus += (req.body.cardAmount * req.body.cardCount) * 0.015
                        await grandparent.save()
                    }
                }
                /**--bonus promotion */
                res.status(201).json({success:true,remain:user.balance,waitingBet:waitingBets,msg:"success"})
            }else
            {
                 res.status(201).json({
                     success:false,
                     error:101,
                     msg:"You don't have enough money! First Charge"  //enough money
                    })
            }
        }else{
            res.status(201).json({
                success:false,
                error:102,   //invalide user
                msg:"Invalide user"
            })
        }
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}
module.exports.gethistory = async function(req,res){
  //  console.log(req)
  //  console.log("HIHI")
    try{
        var betResult = await BetResult
        .find({'betType':req.query.type})
        .sort({'betTimePeroid':'desc'}).skip((req.query.page) * 10).limit(10)
        
        //console.log(betResult)
    
        res.status(201).json({success:true,result:betResult})

    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}

module.exports.getorder = async function(req,res){
    //  console.log(req)
    //  console.log("HIHI")
      try{
          var bets = await BetSchema
          .find({'userId':req.query.userId,'betType':req.query.type})
          //.sort({'betTimePeroid':'desc'}).skip((req.query.page) * 10).limit(10)
          
          //console.log(betResult)
      
          res.status(200).json({success:true,bets:bets})
  
      }catch(err){
          console.log(err)
          res.status(401).json({success:false})
      }
  }