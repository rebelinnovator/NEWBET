const request = require('request');

module.exports.otp = function (req, res) {
    console.log("@34234")
    const phone = req.query.phonenumber
  
    console.log(phone)
  /*
    res.json({
        code: 200,
        sessionId: '234234345345345',
        msg: 'Generated verification code successfully',
        tip: 'Please check your phone.'
    })

        return
        */
     // url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+91' + phone + '/AUTOGEN',
   
    var options = {
         method: 'GET',
        url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+91' + phone + '/AUTOGEN',
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
                /*
                otpSession = otpSession.filter((item)=>item.phonenumber!=phone)
                otpSession.push({
                    phonenumber:phone,
                    sessionId:JSON.parse(body).Details
                })
                */
               // console.log(otpSession)
                res.json({
                    code: 200,
                    sessionId: JSON.parse(body).Details,
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
module.exports.checkOtp =  function (otpseesion,otp)
{
    return new Promise(function(resolve,reject){
        console.log(otpseesion)
        //   return false
       
       
               var options = {
                   method: 'GET',
                  url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/VERIFY/' + otpseesion +'/'+ otp,
                  headers: { 'content-type': 'application/x-www-form-urlencoded' },
                  form: {} 
              }
              console.log(options)
              //return true;
               request(options, (error, response, body) => {
                   if (error) {
                       console.log(error)
  
                         reject(false)
                   }else{
                        console.log(JSON.parse(body).Status)

                        if(JSON.parse(body).Status == 'Error')
                        {
                            resolve(false)
                        }else
                        {
                            resolve(true)
                        }
                        
                   }
               })
    })
        //return true
}
