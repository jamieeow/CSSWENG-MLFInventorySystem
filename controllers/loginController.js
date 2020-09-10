const path = require('path');
const db = require('../models/database.js');
const Admins = require('../models/AdminModel.js');
const Cashiers = require('../models/CashierModel.js');

const bcryptjs = require('bcryptjs');

const loginController = {
    //Render login page
    getLogin: function(req, res, next){
        var username = req.query.username;
        var pw = req.query.pw;

        db.findOne(Admins, {userName: username}, 'pw', function(result) {
            if (result) {
                bcryptjs.compare(pw, result.pw, function(err, equal) {
                    if (equal) {
                        req.session.user = username
                        req.session.isAdmin = true
                    }
                    res.send(equal)
                })
            } else {
                db.findOne(Cashiers, {artistID: username}, '', function(result2) {
                    if (result) {
                        bcryptjs.compare(pw, result2.pw, function(err, equal) {
                            if (equal) {
                                req.session.user = username
                                req.session.isAdmin = false
                            }
                            res.send(equal)
                        })
                    } else {
                        res.send(false)
                    }
                })
            }
        })
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    },

    //Render login page and sends username and password
    postLogin: function(req, res, next){
        var username = req.body.username;
        var pw = req.body.pw;

        db.findOne(Admins, {userName: username}, '', function(result) {
            if (result) {
                res.redirect('/admin')
            } else {
                db.findOne(Cashiers, {artistID: username}, '', function(result2) {
                    if (result2) {
                        res.redirect('/')
                    }
                    else res.send(false)
                })
            }
        })
    },
    
    getLoginPage: function(req, res, next) {
        res.render('login')
    }
}

module.exports = loginController;