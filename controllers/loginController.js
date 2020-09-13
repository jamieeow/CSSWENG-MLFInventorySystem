const path = require('path');
const db = require('../models/database.js');
const Admins = require('../models/AdminModel.js');
const Cashiers = require('../models/CashierModel.js');

const bcryptjs = require('bcryptjs');

const loginController = {
    //Render login page
    getLoginPage: function(req, res, next){
        res.render("login")
    },

    //  Checks if user exists in the db and if the password matches
    postLogin: function(req, res, next) {
        var username = req.body.username;
        var pw = req.body.pw;
        
        db.findOne(Admins, {userName: username}, 'password', function(result) {
            if (result) {
                bcryptjs.compare(pw, result.password, function(err, equal) {
                    if (equal) {
                        req.session.user = username
                        req.session.isAdmin = true
                        res.send('/admin')
                    } else res.send('/')
                })
            } else {
                db.findOne(Cashiers, {artistID: parseInt(username)}, 'password', function(result2) {
                    if (result2) {
                        bcryptjs.compare(pw, result2.password, function(err, equal) {
                            if (equal) {
                                req.session.user = username
                                req.session.isAdmin = false
                                res.send('/main')
                            } else res.send('/')
                        })
                    } else res.send('/')
                })
            }
        })
    }
}

module.exports = loginController;