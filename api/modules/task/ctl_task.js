var TasktypeSchema = require('../schemas/taskType_schema.js');
var TaskSchema = require('../schemas/task_schema.js')
var AccountSchema = require('../schemas/account_schema.js');


module.exports.getType = async function(req,res){
    try{
        var taskTypes = TasktypeSchema.find({},function(err,result){
                
                console.log(err)
                console.log(result)
               // console.log(taskTypes)
                res.status(200).json({
                    result:true,
                    taskTypes:result
            })
        })
        

    }catch(err){
        res.status(401).json({result:false})
    }
}
module.exports.postType = async function(req,res){
    console.log("postttt")
    console.log(req.body)
    try{
        var id = req.body._id
        var type = req.body.taskType
        var amount = req.body.taskAmount
        var bonus = req.body.taskBonus
        var status = req.body.taskStatus
        console.log(amount)
        console.log(req.body)
        var have = await TasktypeSchema.findOne({_id:id})

        if(have == undefined){
            //check If I can
            try{
                var tasktype = await TasktypeSchema.create({
                    taskType:type,
                    referralAmount:amount,
                    taskBonus:bonus,
                    taskStatus:status,
                    startTime:new Date(req.body.startTime),
                    endTime:new Date(req.body.endTime)
                })
            }catch(creatingErr){
                console.log("error")
                res.status(401).json({  
                    result:false
                })
            }
            console.log("success")
        }else{

            have.taskType = type
            have.referralAmount = amount
            have.taskBonus = bonus
            have.taskStatus = status

            await have.save()

        }
        var taskTypes = await TasktypeSchema.find()

        res.status(200).json({  
            result:true,
            taskTypes:taskTypes
        })
        
    }catch(err){
        res.status(401).json({  
            result:false
        })
    }
}
module.exports.getTypeForUser = async function(req,res){
    try{
        var taskTypes = await TasktypeSchema.find({taskStatus:'going'})
    
        var user = await AccountSchema.findOne({'phonenumber':JSON.parse(req.query.user).phonenumber})
      
        if(user != null){
            var nowtask = await TaskSchema.findOne({
                'userId':user._id,
                $or:[{'status':0},{'status':1}]
            })
            
            res.status(200).json({
                result:true,
                taskTypes:taskTypes,
                myTask:nowtask
            })

        }else
        {
            res.status(201).json({  //must fix
                result:false,
                error:'nouser'
            })
        }
    }catch(err){
        res.status(201).json({result:false})//must change
    }
}
module.exports.setNowTask = async function(req,res){
    console.log("234")
    try{
       // console.log(req.body)
        var userId = req.body.params.userId
        var task = req.body.params.task
        //console.log(userId)
        //console.log(task)
        var user = await AccountSchema.findOne({
            _id:userId
        })
        console.log(user._id)
        if(user){
            //check if set task 
            console.log('start')

            var oldTask = await TaskSchema.findOne({
                _id     :   user.nowtask
            }).populate({
                path  :  "taskTypeId" 
            })
            console.log('type')
            /*
            console.log(oldTask)
            console.log(oldTask._id)
            console.log(oldTask.taskTypeId.taskType)
            console.log(task.taskType)
            */
            if(!oldTask || oldTask.taskTypeId.taskType != task.taskType){
                console.log('diffferent')
                var newTask = await TaskSchema.create({
                    taskTypeId      :   task._id,
                    userId          :   userId,
                    referralAmount  :   task.referralAmount,
                    referralUsers   :   [],
                    //deadTime        :   task.endTime
                })
        
                user.nowtask = newTask._id
                console.log(newTask._id)
                await user.save()
                res.status(200).json({
                    result:true,
                    myTask:newTask
                })
            }else
            {
                console.log('same')

                oldFinishDate = new Date(oldTask.deadTime)
                console.log(oldFinishDate)
                console.log(Date.now() - oldFinishDate.getTime() > 12 * 3600 * 1000)
                if(Date.now() - oldFinishDate.getTime() > 12 * 3600 * 1000)
                {
                    var newTask = await TaskSchema.create({
                        taskTypeId      :   task._id,
                        userId          :   userId,
                        referralAmount  :   task.referralAmount,
                        referralUsers   :   [],
                        //deadTime        :   task.endTime
                    })
            
                    user.nowtask = newTask._id
                    await user.save()
                    res.status(200).json({
                        result:true,
                        myTask:newTask
                    })
                }else
                {
                    res.status(200).json({
                        result:false
                        //myTask:newTask
                    })
                }

            }
        }else
        {
            console.log('nouser')
            res.status(201,{error:"Unauthorized USER"})//must fix
        }
        
    }catch(err){
        res.status(201,{error:"Unauthorized USER"})//must fix
    }
}

module.exports.getAllMyTasks = async function(req,res){
    console.log("@34234")
    try{
        var owntasks = await TaskSchema.find({
            userId     :   req.query.id
        })
        .populate({
            path:'taskTypeId'
        })
        .sort({'status':'asc'})
        console.log(req.query)
        res.status(200).json({
            result:true,
            owntasks:owntasks
        })
    }catch(err){
        res.status(201).json({result:false})//must change
    }
}


module.exports.giveup = async function(req,res){
    console.log("@234324234")
    try{

        console.log(req.body.params.userId)
        var nowtask = await TaskSchema.findOne({
            userId  :   req.body.params.userId,
            status  :   0
        })
        nowtask.status = 4
        // console.log(nowtask)
        nowtask.deadTime = Date.now()
        await nowtask.save()

        console.log(nowtask)
        var owntasks = await TaskSchema.find({
            userId     :   req.body.params.userId
        })
        .populate({
            path:'taskTypeId'
        })
        .sort({'status':'asc'})

       // console.log(req.query)
        res.status(200).json({
            result:true,
            owntasks:owntasks
        })
    }catch(err){
        console.log(err)
        res.status(201).json({result:false})//must change
    }
}