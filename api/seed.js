
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./config/db_connection.js');
var AccountSchema = require('./modules/schemas/account_schema.js');
const app = express();

const server = app.listen(8888, () => console.log('-- [ PROTECTWEALTH NODE ] SERVER STARTED LISTENING ON PORT 8888 --'));


var userInfo = {
    phonenumber:"123456789",
    password:   "$2a$10$Nutt6.kZv4nJstN9OXrjYu4nPHf0tdB57u7lXqBV8NSyRE91..W2i",
    balance:1000,
    referral_code:-1,
    invite_code:Date.now(),                
    role:"admin",
    account_status: 'Active',
    token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
seed()

async function seed()
{
    console.log("seeding")
    await AccountSchema.create(userInfo);
    console.log("end seeding")

}

