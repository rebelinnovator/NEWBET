var BetSchema = require('../schemas/bet_schema.js');
var AccountSchema = require('../schemas/account_schema.js');

var ComplaintSchema = require('../schemas/complaint_schema.js');


module.exports.addComplaints = async function(req,res){
    console.log(req.params)
    console.log(req.query)
    console.log(req.body)

    //console.log(req.body.params.complaint.type)
    try{
        await ComplaintSchema.create({
            sender      :req.body.params.userId,
            type        :req.body.params.complaint.type,
            description :req.body.params.complaint.description,
            postdate    :Date.now(),
            state       :0
        })
        console.log("234")
        var complaints = await ComplaintSchema.find({
            sender:req.body.params.userId
        })
        console.log("678")
        
        res.status(200).json({
            success:true,
            complaints:complaints
        })
        
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}


module.exports.getComplaints = async function(req,res){

    try{
        /*
        await ComplaintSchema.create({
            sender      :req.query.userId,
            type        :req.query.complaint.type,
            description :req.query.complaint.description,
            postdate    :Date.now(),
            state       :0
        })
        */
        var complaints = await ComplaintSchema.find({
            sender:req.query.userId
        })
        res.status(200).json({
            success:true,
            complaints:complaints
        })
        
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}
