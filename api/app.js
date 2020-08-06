const express = require('express');
const path = require('path');
const fs = require('fs');
const SocketIo = require('socket.io')
var cors = require('cors');

const cron = require("node-cron")

const dotenv = require('dotenv');
dotenv.config();

global.startNowTurnTime = Date.now()
global.bettingGlobalResult = []
global.bettingTotalResult = []
for(i = 0;i < 4;i++)
{
    bettingGlobalResult[i] = []
    for(j = 0;j < 2;j++){
        bettingGlobalResult[i][0] = []
        bettingGlobalResult[i][1] = []
        for(k = 0;k < 10;k++)
        {
            bettingGlobalResult[i][0][k] = 0
        }
        for(k = 0;k < 3;k++)
        {
            bettingGlobalResult[i][1][k] = 0
        }
    }
}

const Auth = require('./modules/auth/router.js');
const Course = require('./modules/course/router.js');
const Activity = require('./modules/activity/router.js');
const Game = require('./modules/game/router.js');
const Task = require('./modules/task/router.js');
const Promotion = require('./modules/promotion/router.js');
const Financial = require('./modules/financial/router.js');
const Bank = require('./modules/bank/router.js');
const Complaint = require('./modules/complaint/router.js');

var Otp = require('./modules/OtpService.js');




const BetResult = require('./modules/schemas/betResult_schema.js');
var BetSchema = require('./modules/schemas/bet_schema.js');
var FinancialSchema = require('./modules/schemas/financial_schema.js');
var AccountSchema = require('./modules/schemas/account_schema.js');
var TaskTypeSchema = require('./modules/schemas/taskType_schema.js');
var TaskSchema = require('./modules/schemas/task_schema.js');


require('./config/db_connection.js');
require('./config/passport.js');

/** */

/** */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
const app = express();

app.use(cors())

var cookieParser = require('cookie-parser');
const { isValidObjectId } = require('mongoose');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.query.courseId && !fs.existsSync(__dirname+'/public/uploads/'+req.query.courseId)) {
            fs.mkdirSync(__dirname+'/public/uploads/'+req.query.courseId);
        }
        if (req.query.mode === 'coverimage') {            
            if (fs.existsSync(__dirname+'/public/uploads/'+req.query.courseId+'/cover.png')) {
                fs.unlinkSync(__dirname+'/public/uploads/'+req.query.courseId+'/cover.png');
            }
            cb(null, './public/uploads/'+req.query.courseId);
        } if (req.query.mode === 'video' || req.query.mode === 'section') {
            cb(null, './public/uploads/'+req.query.courseId);
        } else {
            cb(null, './public/uploads/');
        }
    },
    filename: function (req, file, cb) {
        /*if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, Date.now() + '-' +  file.originalname);
        }*/
        if (req.query.mode === 'coverimage') {
            cb(null, 'cover.png');
        } else {
            cb(null, Date.now() + '-' +  file.originalname); 
        }
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('file');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

  
app.use('/auth', Auth);
app.use('/courses', Course);
app.use('/activity', Activity);
app.use('/game', Game);
app.use('/task',Task);
app.use('/promotion',Promotion);
app.use('/financial',Financial);
app.use('/bank',Bank);
app.use('/complaint',Complaint);

app.get('/otp',Otp.otp);



// FileUpload
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'The file size is too big! Max. 10MB' });
            } else if (err.code === 'filetype') {
                res.json({ success: false, message: 'The file does not match the desired file format! (JPG, JPEG, PNG)'});
            }else {
                console.log(err);
                res.json({success: false, message: 'The upload of the file could not be completed.'});
            }
        }else{
            if(!req.file){
                res.json({success: false, message: 'No file was selected for upload!'});
            }else{
                res.json({success: true, message: 'The file has been uploaded successfully.', file: req.file});
            }
        }
    })
})


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// web server 8080
const server = app.listen(8888, () => console.log('-- [ PROTECTWEALTH NODE ] SERVER STARTED LISTENING ON PORT 8888 --'));

const io = SocketIo(server)


/*
const startInverval = setInterval(()=>{
    if(Date.now() % 30000 == 0)
    {
        gameInterval()
        console.log("OK")
    }
    console.log("finding")
},1000)
*/

let betTime = 1 * 60 * 1000
let connectedUser = []
let manageUser = []
let calcdone = 0
let tempstart = Date.now()
let bettingNumber = 0
let nowDate = getNowDay()
//var bettingNumerDateString = getNowDateFormat()

gameInterval()

function getNowDateFormat()
{
    var returnval = ""
    var date = new Date()
    var mon = date.getMonth()
    var day = date.getDate()
    mon++;//Why?
    returnval += (date.getFullYear().toString() 
                + Math.floor(mon / 10).toString()
                + Math.floor(mon % 10).toString()
                + Math.floor(day / 10).toString()
                + Math.floor(day % 10).toString()
                )
    return returnval
}
function getNumFormat(num)
{
    var returnval = ""
    var temp = num
    var hundred = Math.floor(temp / 100)
    temp -= hundred * 100
    
    returnval = hundred.toString() 
    + Math.floor(temp / 10).toString()
    + Math.floor(temp % 10).toString()

    return returnval
    
}
function getNowDay()
{
    let getD = new Date()
    return getD.getDate()
}

function gameInterval(){
    setTimeout(()=>{
        
        calcResult()

     },betTime - 25 * 1000)

    setInterval( () => {


        processOneBet()
        setTimeout(()=>{

            calcResult()
     
         },betTime - 25 * 1000)
        /** */
        //console.log("start:" + (Math.ceil((startNowTurnTime - 1594989860000) / 1000)).toString())
        
       

    },betTime)    
}
async function processOneBet()
{
    tempstart = startNowTurnTime
    if(nowDate != getNowDay())
    {
        nowDate = getNowDay()
        bettingNumber = 0
       
    }

    let tmpDispTime = getNowDateFormat() + getNumFormat(bettingNumber)
    
    bettingNumber++
    
    startNowTurnTime = Date.now()

    io.emit("bettingFinished")   

    /** */
    for(i = 0;i < 4;i++)
    {
         await BetResult.create({
            betTimePeroid:tempstart,//fix
            betDisplayTime:tmpDispTime,
            betType:i,
            betPrice:100,//fix
            betNumber:bettingTotalResult[i].Num,
            betColor:bettingTotalResult[i].Clr
        })
    }
    //rebalance
    await reBalance()
    calcdone = 0
    var bettingHistory = await getBettingHistory()

    var sockets = io.sockets.sockets;

    for(var socketId in sockets)
    {
        var sock = sockets[socketId] //loop through and do whatever with each connected socket

        var user = connectedUser.filter((item)=>item.socketId == sock.id)
        if(user.length == 1){
            console.log("emitAll")
            console.log(user)
            await emitNewBetting(sock,user[0].userId,bettingHistory)
        }

        var manager = manageUser.filter((item)=>item.socketId == sock.id)
        if(manager.length == 1){
          //  console.log("emitAll")
            console.log(user)
            await emitCalcResultToAdmin(sock)
        }

    //...
    }
    removeBettingGlobalResult()
}
function removeBettingGlobalResult()
{
    bettingGlobalResult = []
    for(i = 0;i < 4;i++)
    {
        bettingGlobalResult[i] = []
        for(j = 0;j < 2;j++){
            bettingGlobalResult[i][0] = []
            bettingGlobalResult[i][1] = []
            for(k = 0;k < 10;k++)
            {
                bettingGlobalResult[i][0][k] = 0
            }
            for(k = 0;k < 3;k++)
            {
                bettingGlobalResult[i][1][k] = 0
            }
        }
    }
}
function calcResult(){
  
    bettingTotalResult.splice(0,bettingTotalResult.length)
    for(i = 0;i < 4;i++)
    {
        minNumIndex = bettingGlobalResult[i][0].indexOf(Math.min(...bettingGlobalResult[i][0]))
        minClrIndex = 0
        if(bettingGlobalResult[i][1][0] == bettingGlobalResult[i][1][2])
        {
             //random
            if(Math.random() > 0.5)
                minClrIndex = 100 + 10
            else
                minClrIndex = 1000 + 100

        }else
        {
            if(bettingGlobalResult[i][1][0] > bettingGlobalResult[i][1][2])
            {

                minClrIndex = 1000
    
            }else
            {
                minClrIndex = 10
            }
        }
        bettingTotalResult.push({Num:minNumIndex,Clr:minClrIndex})
    }

    calcdone = 1
    var sockets = io.sockets.sockets;
    for(var socketId in sockets)
    {
        var sock = sockets[socketId] 
        var manager = manageUser.filter((item)=>item.socketId == sock.id)
        
        if(manager.length == 1){
            emitCalcResultToAdmin(sock)
        }

    //...
    }
    //console.log(bettingTotalResult)
}
async function reBalance()
{
    var bets = await BetSchema.find({'betTime':tempstart})
   // console.log("bets")
  //  console.log(bets)

    for(i = 0;i < bets.length;i++)
    {
        var earn = 0;
        var user = await AccountSchema.findOne({'_id':bets[i].userId})
        var betTypeString = ['GOLDEN BET','SILVER BET','BRONZE BET','OTHER BET']
        bets[i].betResult = false
        
        
        var delevery = bets[i].betCardAmount * bets[i].betCardCount * 0.95
        var fee = bets[i].betCardAmount * bets[i].betCardCount * 0.05

        if(bets[i].betCardType <= 9)
        {
            if(bettingTotalResult[bets[i].betType].Num == bets[i].betCardType)   
            {
                //success 
                earn = 9 * (delevery)
                user.balance = user.balance + 9 * (delevery)

                bets[i].betResult = true
                await user.save()
            }

        }else
        {
            //about color
            //in this case
            var res = bettingTotalResult[bets[i].betType].Clr
            var answer = Math.pow(10,(bets[i].betCardType - 9))
            var bidSucess = false
            var wining = 0
            console.log(res)
            console.log(answer)
            //delevery = bets[i].betCardAmount * bets[i].betCardCount * 0.95


            if(res == 10){//result is green
                bidSucess = true
                if(answer == res)
                    wining = 2 * (bets[i].betCardAmount * bets[i].betCardCount * 0.95)
            }else if(res == 100){//result is vilot
                bidSucess = true    //deprecated

            }else if(res == 1000){//result is red
                bidSucess = true
                if(answer == res)
                    wining = 2 * (bets[i].betCardAmount * bets[i].betCardCount * 0.95)
            }else if(res == 110){//result is green and vilot
                bidSucess = true
                if(answer == 10 || answer == 100)
                    wining = 0.5 * (bets[i].betCardAmount * bets[i].betCardCount * 0.95)
            }else if(res == 1100)//result is red and vilot
            {
                bidSucess = true
                if(answer == 10 || answer == 100)
                    wining = 0.5 * (bets[i].betCardAmount * bets[i].betCardCount * 0.95)
            }
            if(bidSucess)
            {
                console.log("winning")
                console.log(wining)
               // var user = await AccountSchema.findOne({'phonenumber':bets[i].phonenumber})
                user.balance = user.balance + wining
                await user.save()
                earn = wining
                bets[i].betResult = true

            }

        }
        var lost = bets[i].betCardAmount * bets[i].betCardCount
        var total = earn - lost
        bets[i].betOrdered = true
        bets[i].betDelevery = delevery
        bets[i].betFee = fee
        bets[i].betAmount = earn - delevery

        await FinancialSchema.create({
            createTime      :   Date.now(),
            financialType   :   betTypeString[bets[i].betType],
            amount          :   total,
            userId          :   user._id
        })

        await bets[i].save()

        
    }
    
}
async function getBettingHistory()
{
    var betResult0 = await BetResult.find({'betType':0}).sort({'betTimePeroid':'desc'}).limit(10)
    var betResult1 = await BetResult.find({'betType':1}).sort({'betTimePeroid':'desc'}).limit(10)
    var betResult2 = await BetResult.find({'betType':2}).sort({'betTimePeroid':'desc'}).limit(10)
    var betResult3 = await BetResult.find({'betType':3}).sort({'betTimePeroid':'desc'}).limit(10)

  //  console.log(betResult0)
    return {
        type0:betResult0,
        type1:betResult1,
        type2:betResult2,
        type3:betResult3  
    }
}
async function emitNewBetting(socket,userid,bettingHistory)
{
    var user  = await AccountSchema.findOne({"_id":userid})
    if(user){
        //console.log(user)
        var waitingBets = []
        if(bettingHistory == -100){
            bettingHistory = await getBettingHistory()
            waitingBets = await BetSchema.find({userId:user._id,betOrdered:false})
        }
        
        var mybalance =  user.balance//get By userId here Wait
        //get waitingOrder

        socket.emit('startNewBetting',{
            balance:mybalance,
            history:bettingHistory,
            remain:betTime - (Date.now() - startNowTurnTime),
            nowBettingNum: getNowDateFormat() + getNumFormat(bettingNumber),
            waitingBets:waitingBets
        })
    }
}

function emitCalcResultToAdmin(socket)
{
 //Send recommend Reuslt to Manager
   socket.emit('recomResult',{
       calcdone:calcdone,
       result:bettingTotalResult,
       remain:betTime - (Date.now() - startNowTurnTime),
       nowBettingNum: getNowDateFormat() + getNumFormat(bettingNumber),
   })
}
io.on('connection', function(socket) {
    console.log("New Client connected!")
 //   console.log("now:" + (Math.ceil((Date.now() - 1594989860000) / 1000)).toString())
    socket.on('connectedUser',(data)=>{
        console.log("NEWUSERCONNECTED")
        connectedUser.push({
            userId:data.user,
            socketId:socket.id
        })
        logUSER()
        emitNewBetting(socket,data.user,-100)
        
    })
    socket.on('connectedManager',(data)=>{

        manageUser.push({
            userId:data.user,
            socketId:socket.id
        })
    //    emitNowCourseInfo(socket)
    //    if(calcdone)
        emitCalcResultToAdmin(socket)
        logUSER()
    })
    socket.on('setBetResultByAdmin',(data)=>{
        calcdone = 2//by admin
        if(data.result.num != -1)
            bettingTotalResult[data.type].Num = data.result.num
        if(data.result.clr != -1)
            bettingTotalResult[data.type].Clr = data.result.clr

        console.log(bettingTotalResult)
        emitCalcResultToAdmin(socket)
    })
    socket.on('disconnect', (reason) => {
        console.log('disconnected')
        connectedUser = connectedUser.filter((item)=>item.socketId != socket.id)
        manageUser = manageUser.filter((item)=>item.socketId != socket.id)
        logUSER()
    })

    }
)
function logUSER()
{
//    console.log(manageUser)
//    console.log("BETWEEEN")
//    console.log(connectedUser)
}



///schedule
cron.schedule("30 0 * * *", async function() {
    console.log("THIS is cron test")
    var d = new Date(Date.now())
    console.log(d)
    var s = d.toISOString()
    console.log(s)

    var c = s.slice(0,10)
    console.log(c)

    var expiredTaskType = await TaskTypeSchema.find({
        endTime     :   { $lte : c /*new Date((Date.now)).toISOString().slice(0,10)*/},
        taskStatus  :   'going'
    })
    console.log(expiredTaskType.length)
    expiredTaskType.map(async (item)=>{
        var type = item._id
        
        await TaskSchema.updateMany({
            taskTypeId  :   type,
            status      :   0
        },{status : 3})
        item.taskStatus = 'finish'
        await item.save()
    })

    //
    await AccountSchema.updateMany({},{todaySubmitBonus:0})

})