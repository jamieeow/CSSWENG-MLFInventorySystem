const path = require('path');

const mainController = {
    //Render main page
    getMain: function(req, res, next){
        res.sendFile(path.join(__dirname + '/../views/main.html'));
    },

    postOrderCheckOut: function(req, res, next){
        res.redirect('/');
    },

    postAddArtist: function(req, res, next){
        res.redirect('/');
    },

    postAddItem: function(req, res, next){
        res.redirect('/');
    },

    postAddPromo: function(req, res, next){
        res.redirect('/');
    },
    
}

module.exports = mainController;