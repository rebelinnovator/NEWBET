var FinancialSchema = require('../schemas/financial_schema.js');


module.exports.getAll = async function(req,res){
    try{
        var userId = req.body.id
  //      console.log(req.query.id)
    //    console.log(req.body)
      //  console.log(req)
      //  console.log(user)
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)

        var financials = await FinancialSchema.find({
            userId        :   req.query.id
           
        })
    
        res.status(200).json({
            financials: financials
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})
    }
}