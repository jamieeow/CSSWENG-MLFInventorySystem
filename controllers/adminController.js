const path = require('path');
const mongoose = require('mongoose');
const db = require('../models/database.js');
const Artist = require('../models/ArtistModel.js');

const adminController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
        //find artist then render with details
        db.findMany(Artist, {}, '', result=>{
            let artistArray = [];

            for (let i=0;i<result.length;i++){
                artistObj = {
                        artistID: result[i].artistID,
                        artistName: result[i].artistName,
                    }
                artistArray.push(artistObj);
            }
            var details = {
                artist: artistArray,
            }
            res.render('admin',details)
        })
    },

    /*
    //Render admin with data
    postLoginAdmin: function(req, res, next){
        res.redirect('/admin');
    },
    */

    //Add artist to database
    postAddArtist: function(req, res, next){
        data = {
            _id: new mongoose.Types.ObjectId(),
            artistID: 11812345,
            artistName: req.body.newArtistName
        }
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

    //Add item to database
    postAddItem: function(req, res, next){
        console.log(req.body);
        res.redirect('/admin');
    },
    
}

module.exports = adminController;