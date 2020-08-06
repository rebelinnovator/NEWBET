var AccountSchema = require('../schemas/account_schema.js');
var ContactSchema = require('../schemas/contact_schema.js');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

module.exports.update = function (req, res) {
    var userInfo = {
        nickname: req.body.user.nickname,
        role: req.body.user.role,
        account_status: req.body.user.accountStatus
    };

    if (req.body.user.avatar) {
        userInfo.avatar = req.body.user.avatar;
    }

    var query = { '_id': req.body.user.userId }


    AccountSchema.findOne({ '_id': req.body.user.userId }, async function (err, user) {
        //var accountDoc = await AccountSchema.findOne({'email': userInfo.email});
        /*
        if (user.email !== userInfo.email && accountDoc === null) {
            return res.status(201).json({success: false, message: "Same eamil address already exist"});
        }
        */
        AccountSchema.update({ '_id': req.body.user.userId }, userInfo, function (err, doc) {
            if (err) {
                return res.status(201).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        })
    });
}

module.exports.checkPassword = function (req, res) {
    AccountSchema.findOne({ '_id': req.body.userId }, async function (err, user) {
        if (err) { 
            return res.status(201).json({success: false, message: "No such user"});
        }
      
        // Return if password is wrong
        if (user && !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(201).json({success: false, message: "Password is wrong"});
        }

        /*var accountDoc = await AccountSchema.findOne({'email': req.body.model.email});
        if (user.email !== req.body.model.email && accountDoc !== null) {
            return res.status(201).json({success: false, message: "Email address is already exist"});
        }*/

        return res.status(201).json({success: true});
    });
}

module.exports.updatePassword = async function (req, res) {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        var userInfo = {
            password: hash
        }
    
        var query = { '_id': req.body.userId }
    
        AccountSchema.update(query, userInfo, function (err, doc) {
            if (err) {
                res.status(201).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        })    
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
}

// Account Management
module.exports.getAllAccountData = async function (req, res) {
    try {
        AccountSchema.find( {} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
    
}

module.exports.getInactiveAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Inactive"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
    
}

module.exports.getActiveAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Active"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
    
}

module.exports.getClosedAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Closed"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
}

module.exports.getRestrictedAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Restricted"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
    
}

module.exports.updateAccountData = async function (req, res) {
    // console.log(req.body);

    var userInfo = {
        user_name: req.body.user.user_name,
        email: req.body.user.email,
        role: req.body.user.role,
        account_status: req.body.user.account_status,
        start_time: req.body.user.start_time,
        end_time: req.body.user.end_time
    }

    if (req.body.user.password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.user.password, salt);
        userInfo.password = hash;
    }

    var query = { '_id': req.body.user._id }

    var accountDoc = await AccountSchema.findOne({'email': userInfo.email});
    if (accountDoc == null) {
        AccountSchema.update(query, userInfo, function (err, doc) {
            if (err) {
                res.status(201).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        })
    } else {
        console.log("Account is alread exist");
        res.status(201).json({success: false, message: "Account is already exist"});
    }
}

module.exports.removeAccountData = function (req, res) {

    console.log(req.body);
    AccountSchema.findOne({'_id': req.body.accountId}, function (err, doc) {
        if (err) {
            res.status(201).json({ message: 'Error user find' });
        }else{
            if (doc == null) {
                console.log(req.body.accountId + " => doc doesn't exist");
                res.status(201).json({ message: 'null error' , doc: doc});
            }else{
                doc.remove(function (err, doc) {
                    if (err)
                        res.status(201).json({ message: 'Error deleted' });
                    else
                        res.status(201).json({ message: 'Successfully deleted' });
                });
            }
        }
    })
}

module.exports.removeAccountsData = function (req, res) {

    console.log(req.body);
    var cursor  = req.body.accountIds;
    cursor.forEach(cur => {
        AccountSchema.findOne({'_id': cur}, function (err, doc) {
            if (err) {
                res.status(201).json({ message: 'Error user find' });
            }else{
                if (doc == null) {
                    console.log(req.body.accountId + " => doc doesn't exist");
                    res.status(201).json({ message: 'null error' , doc: doc});
                }else{
                    doc.remove(function (err, doc) {
                        if (err)
                            res.status(201).json({ message: 'Error deleted' });
                    });
                }
            }
        });    
    });
    res.status(201).json({ message: 'Successfully deleted' });
}

module.exports.getAccountDataById = async function (req, res) {
    console.log(req.body._id);
    try {
        AccountSchema.findOne( { '_id' : req.body._id } , function (err, doc) {
            if (err) {
                console.log(err);
                res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
    
}

module.exports.addAccountData = async function (req, res) {
    console.log(req.body.newAccount);
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.newAccount.password ? req.body.newAccount.password : "protectwealth", salt);

        var userInfo = {
            user_name: req.body.newAccount.user_name,
            email :     req.body.newAccount.email || null,
            password:   hash,
            role: req.body.newAccount.role == '' ? 'user' : req.body.newAccount.role,
            account_status:   req.body.newAccount.account_status == '' ? "Active" : req.body.newAccount.account_status,
            token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            start_time: req.body.newAccount.start_time,
            end_time: req.body.newAccount.end_time,
        }
        var accountDoc = await AccountSchema.findOne({'email': userInfo.email});
        if (accountDoc == null) {
            accountDoc = await AccountSchema.create(userInfo);
            console.log("Account is registered");
            console.log(accountDoc);
            res.status(201).json({success: true, doc: accountDoc});
        } else {
            console.log("Account is alread exist");
            res.status(201).json({success: false, message: "Account is already exist"});
        }
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
}

module.exports.resetPassword = async function (req, res) {
    console.log(req.body.accountId);
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("protectwealth", salt);

        var userInfo = {
            password: hash
        }
    
        var query = { '_id': req.body.accountId }
    
        AccountSchema.update(query, userInfo, function (err, doc) {
            if (err) {
                res.status(201).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        })    
    } catch (error) {
        console.log(error);
        res.status(201).json({success: false, error: error});
    }
}

module.exports.addContact = function (req, res) {
    var data = {
        userId: req.body.userId,
        subject: req.body.subject,
        message: req.body.message
    }

    var doc = ContactSchema.create(data, function (err, doc) {
        if (err) {
            return res.status(201).json({success: false})
        }
        res.status(201).json({success: true, doc: doc});
    });
    
}

module.exports.setQuiz = function (req, res) {
    var data = {
        quiz: req.body.quiz
    }

    AccountSchema.update({ '_id': req.body.userId }, data, function (err, doc) {
        if (err) {
            return res.status(201).json({success: false, error: err});
        }
        res.status(201).json({success: true, doc: doc});
    })
    
}