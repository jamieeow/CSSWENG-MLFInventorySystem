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
    
}

module.exports = loginController;