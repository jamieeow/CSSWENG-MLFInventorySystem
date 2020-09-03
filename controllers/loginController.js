const path = require('path');

const loginController = {
    //Render login page
    getLogin: function(req, res, next){
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    },

    //Render login page and sends username and password
    postLogin: function(req, res, next){
        res.redirect('/');
    },

    //Render admin
    getLoginAdmin: function(req, res, next){
        res.render('admin')
    },

    //Render admin with data
    postLoginAdmin: function(req, res, next){
        res.redirect('/admin');
    },
    
}

module.exports = loginController;