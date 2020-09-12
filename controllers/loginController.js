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

    //Render login page and sends username and password
    getLogin: function(req, res, next){
        var username = req.query.username;
        var pw = req.query.pw;
        
        db.findOne(Admins, {userName: username}, 'password', function(result) {
            if (result) {
                bcryptjs.compare(pw, result.password, function(err, equal) {
                    res.send(equal)
                })
            } else {
                db.findOne(Cashiers, {artistID: username}, 'password', function(result2) {
                    if (result) {
                        bcryptjs.compare(pw, result2.password, function(err, equal) {
                            res.send(equal)
                        })
                    } else {
                        res.send(false)
                    }
                })
            }
        })
    },

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
                db.findOne(Cashiers, {artistID: username}, 'password', function(result2) {
                    if (result) {
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