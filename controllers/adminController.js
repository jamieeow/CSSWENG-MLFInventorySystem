const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');

const adminController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
        //find artist then render with details
        db.findMany(Artists, {}, '', result=>{
        
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
            if (result){
                res.render('admin',details)
            }
            else {
                res.render('admin')
            }            
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
            artistID: req.body.artistID,
            artistName: req.body.artistName
        }
        db.insertOne(Artists, data, result=>{
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
    //TODO: eventID and multer for itemPicture
    postAddItem: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
          const upload = multer({
              storage: storage
          }).single('itemPhotoPickerInput');

          upload(req, res, (err) => {
            if (!err){
                data = {
                    _id: new mongoose.Types.ObjectId(),
                    artistID: req.body.selectedArtist,
                    eventID: new mongoose.Types.ObjectId(), //temp
                    itemName: req.body.newItemName,
                    itemPrice: req.body.newPriceStock,
                    stockQuantity: req.body.newStockQuantity,
                    itemsSold: 0,
                    itemPicture: '/photo/'+ req.file.originalname,
                }
                db.insertOne(Items, data, result=>{
                    if (result) {
                        console.log("Successfully added item to the Items collection");
                    }
                    else {
                        console.log("Error adding item to the Items collection");
                    }
                });  
                res.redirect('/admin');
            }
        })
    },
    
}

module.exports = adminController;