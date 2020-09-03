const path = require('path');
const mongoose = require('mongoose');
const db = require('../models/database.js');
const Artist = require('../models/ArtistModel.js');

const adminController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
        res.render('admin')
    },

    //Render admin with data
    postLoginAdmin: function(req, res, next){
        res.redirect('/admin');
    },

    //Add artist to database
    postAddArtist: function(req, res, next){
        data = {
            _id: new mongoose.Types.ObjectId(),
            artistID: 11812345,
            artistName: req.body.newArtistName
        }
        console.log(data)
        db.insertOne(Artist, data, result=>{
            if (result) {
                console.log("Successfully added artist to the Artist collection");
            }
            else {
                console.log("Error adding artist to the Artist collection");
            }
        });
        res.redirect('/admin');
    },
    
}

module.exports = adminController;