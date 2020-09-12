const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');

const adminEditController = {
    //Edit artist information (artistID and artistName)
    putEditArtist: function(req, res, next){
        let retrievedData = { //change this
            _id: new mongoose.Types.ObjectId(req.body.editArtistID),
            artistID: req.body.editArtistIDNumber,
            artistName: req.body.editArtistName,
        }

        db.updateOne(Artists, {_id: req.body.editArtistID}, retrievedData, result=>{
            if (result) {
                console.log("Successfully updated artist details.");
            }
            else {
                console.log("Error updating artist details");
            }
        })

        res.redirect('/admin');
    },

    //Edit item information (artistID, eventID, itemName, stockQuantity, itemPicture)
    postEditItem: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
          const upload = multer({
              storage: storage
          }).single('itemPhotoPickerInput'); //change this

          upload(req, res, (err) => {
            if (!err){
                data = {
                    _id: new mongoose.Types.ObjectId(),
                    artistID: req.body.itemSelectedArtist,
                    //eventID: new mongoose.Types.ObjectId(), //temp
                    itemName: req.body.newItemName,
                    //itemPrice: req.body.newPriceStock,
                    stockQuantity: req.body.newStockQuantity,
                    //itemsSold: 0,
                    itemPicture: '/photo/'+ req.file.originalname,
                }
                
                db.updateOne(Items, data, result=>{
                    if (result) {
                        console.log("Successfully updated item details");
                    }
                    else {
                        console.log("Error updating item details");
                    }
                });
                
                res.redirect('/admin');
            }
        })
        
        res.redirect('/admin');
    },

    //Edit bundle information (artistID, eventID, itemName, stockQuantity, itemPicture)
    postEditBundle: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
          const upload = multer({
              storage: storage
          }).single('itemPhotoPickerInput'); //change this

          upload(req, res, (err) => {
            if (!err){
                data = {
                    _id: new mongoose.Types.ObjectId(),
                    artistID: req.body.itemSelectedArtist,
                    //eventID: new mongoose.Types.ObjectId(), //temp
                    itemName: req.body.newItemName,
                    //itemPrice: req.body.newPriceStock,
                    stockQuantity: req.body.newStockQuantity,
                    //itemsSold: 0,
                    itemPicture: '/photo/'+ req.file.originalname,
                }
                
                db.updateOne(Bundles, data, result=>{
                    if (result) {
                        console.log("Successfully updated bundle details");
                    }
                    else {
                        console.log("Error updating bundle details");
                    }
                });
                
                res.redirect('/admin');
            }
        })
        
        res.redirect('/admin');
    },

    //Edit event information (eventName, startDate, endDate)
    putEditEvent: function(req, res, next){
        let retrievedData = { //change this
            _id: new mongoose.Types.ObjectId(req.body.eventID),
            eventName: req.body.eventName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        }

        db.updateOne(Events, {_id: req.body.eventID}, retrievedData, result=>{
            if (result) {
                console.log("Successfully updated event details.");
            }
            else {
                console.log("Error updating event details");
            }
        })
        
        res.redirect('/admin');
    },

    //returns artists
    getArtist: function(req, res, next){
        db.findMany(Artists, {}, '', function(result) {
                
            if (result.length > 0) {
                res.send(result)
            }
            else {
                console.log('Artists not found in the collection.');
                res.send(false)
            }
        })
    },

    /*  add stocks increments stockQuantity */
    getItems: function(req, res, next){
        db.findMany(Items, {artistID: req.query.artistID}, req.query.projection, function(result) {
                
            if (result.length > 0) {
                res.send(result)
            }
            else {
                console.log('Artist ' + req.query.artistID + ' not found in the collection.')
                res.send(false)
            }
        })
    },
}

module.exports = adminEditController;