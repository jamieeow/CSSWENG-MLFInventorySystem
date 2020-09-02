const path = require('path');

const mainController = {
    //Render main page
    getMain: function(req, res, next){
        var details = {
            totalSold: 400,
            daysLeft: 2,
            hoursLeft: 11,
            foliosGiven: 400,
            artist: [{
                artistID: 1,
                artistName: "Artist 1"
            },
            {
                artistID: 2,
                artistName: "Artist 2"
            },
            {
                artistID: 3,
                artistName: "Artist 3"
            }]
        }

        res.render('main', details);
        // res.sendFile(path.join(__dirname + '/../views/main.html'));
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