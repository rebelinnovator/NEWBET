const express = require('express')
const router = express.Router()
const request = require('request');
const http = require('http')
module.exports.otp = function (req, res) {
    const phone = req.body.phonenumber
     // url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+91' + phone + '/AUTOGEN',
  
    var options = {
         method: 'GET',
        url: 'http://2factor.in/API/V1/' + process.env.API_KEY + '/SMS/+917428730930/AUTOGEN',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {} 
    }
    /*
    var options = {
        "method": "GET",
        "hostname": "2factor.in",
        "port": null,
        "path": "/API/V1/" + process.env.API_KEY + "/SMS/917428730930/AUTOGEN",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        }
      };
      
      var reqest = http.request(options, function (response) {
        var chunks = [];
      
        reqest.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        reqest.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      */
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
         res.json({
            code: 200,
            sessionId: body.Details,
            msg: 'Generated verification code successfully',
            tip: 'Please check your phone.'
        })
    })
    
    
}