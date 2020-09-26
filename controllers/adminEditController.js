const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');
const Cashiers = require('../models/CashierModel.js');

const adminEditController = {
    //Edit artist information (artistID and artistName)
    postEditArtist: function(req, res, next){
        //Artist details
        let artistDetails = {
            artistID: req.body.editArtistIDNo,
            artistName: req.body.editArtistName,
        }

        //Cashier details
        cashierDetails = {
            artistID: req.body.editArtistIDNo,
            password: req.body.editArtistPassword,
        }

        db.updateOne(Artists, {artistID: req.body.artistsListDropdownEdit}, artistDetails, result=>{
            if (result) {
                console.log("Successfully updated artist details.");
            }
            else {
                console.log("Error updating artist details");
            }

            bcryptjs.hash(cashierDetails.password, saltRounds, function(err, hash) {
                cashierDetails.password = hash
                db.updateOne(Cashiers, {artistID: req.body.artistsListDropdownEdit}, cashierDetails, cResult=>{
                    if (cResult) {
                        console.log("Successfully updated cashiers details.");
                    }
                    else {
                        console.log("Error updating cashiers details");
                    }
                })
            })

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
          }).single('editItemPhotoPickerInput');

          upload(req, res, (err) => {
            if (!err){
                if (req.file) {
                    data = {
                        _id: req.body.artistsListDropdownItem,
                        artistID: req.body.artistsListDropdownItemEdit,
                        //eventID: new mongoose.Types.ObjectId(), //temp
                        itemName: req.body.editItemName,
                        stockQuantity: req.body.editItemStockQuantity,
                        itemPicture: '/photo/'+ req.file.originalname,
                    }
                }
                else {
                    data = {
                        _id: req.body.artistsListDropdownItem,
                        artistID: req.body.artistsListDropdownItemEdit,
                        //eventID: new mongoose.Types.ObjectId(), //temp
                        itemName: req.body.editItemName,
                        stockQuantity: req.body.editItemStockQuantity,
                        //itemPicture: '/photo/'+ req.file.originalname,
                    }
                }
                
                db.updateOne(Items,{_id: req.body.artistsListDropdownItem} ,data, result=>{
                    if (result) {
                        console.log("Successfully updated item details");
                    }
                    else {
                        console.log("Error updating item details");
                    }
                    res.redirect('/admin');
                });
            }
        })
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
          }).single('editBundlePhotoPicker');

          upload(req, res, (err) => {
            if (!err){
                if (req.file) {
                    data = {
                        _id: req.body.artistsListDropdownBundle,
                        artistID: req.body.artistsListDropdownBundleEdit,
                        //eventID: new mongoose.Types.ObjectId(), //temp
                        bundleName: req.body.editBundleName,
                        bundleStock: req.body.editBundleStockQuantity,
                        bundlePicture: '/photo/'+ req.file.originalname,
                        includedItems: req.body.editSelectedItems,
                    }
                }
                else {
                    data = {
                        _id: req.body.artistsListDropdownBundle,
                        artistID: req.body.artistsListDropdownBundleEdit,
                        //eventID: new mongoose.Types.ObjectId(), //temp
                        bundleName: req.body.editBundleName,
                        bundleStock: req.body.editBundleStockQuantity,
                        //bundlePicture: '/photo/'+ req.file.originalname,
                        includedItems: req.body.editSelectedItems,
                    }
                }
                
                db.updateOne(Bundles, {_id:req.body.artistsListDropdownBundle},data, result=>{
                    if (result) {
                        console.log("Successfully updated bundle details");
                    }
                    else {
                        console.log("Error updating bundle details");
                    }
                    res.redirect('/admin');
                });
            }
        })
    },

    //Edit event information (eventName, startDate, endDate)
    //No need to edit items and bundles because they have event's _id
    //event _id do not change
    postEditEvent: function(req, res, next){
        var isCurrEvent = true;
        if (req.body.editSetCurrentEvent == 1) {
            isCurrEvent = true;
        }
        else {
            isCurrEvent = false;
        }
        let retrievedData = {
            _id: req.body.selectedEvent,
            eventName: req.body.editEventName,
            startDate: req.body.editStartEventDate,
            endDate: req.body.editEndEventDate,
            isCurrentEvent: isCurrEvent,
        }
        db.updateOne(Events, {isCurrentEvent: true}, {isCurrentEvent: false}, result=>{
            if (result) {
                console.log("Successfully updated isCurrentEvent from true to false");
            }
            else {
                console.log("Error updating isCurrentEvent or no current event is selected yet.");
            }
            db.updateOne(Events, {_id: req.body.selectedEvent}, retrievedData, result=>{
                if (result) {
                    console.log("Successfully updated event details.");
                }
                else {
                    console.log("Error updating event details");
                }
                res.redirect('/admin');
            })
        })
    },

    //returns artist
    getArtist: function(req, res, next){
        db.findOne(Artists, {artistID: req.query.artistID}, '', function(result) {     
            if (result) {
                res.send(result)
            }
            else {
                console.log('Artist not found in the collection.');
                res.send(false)
            }
        })
    },

    /*  returns items */
    getItems: function(req, res, next){
        db.findOne(Events, {isCurrentEvent: true}, '', function(resultEvent) {
            if (resultEvent) {
                db.findMany(Items, {artistID: req.query.artistID, eventID:resultEvent._id}, req.query.projection, function(result) {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        console.log('Item ' + req.query.artistID + ' not found in the collection.')
                        res.send(false)
                    }
                })
            }
            else
            {
                console.log('no event');
            }
        })
    },

    /*  returns items */
    getItemsProp: function(req, res, next){
        db.findOne(Items, {_id: mongoose.Types.ObjectId(req.query.itemID)}, '', function(result) {
            if (result) {
                res.send(result)
            }
            else {
                console.log('Item ' + req.query.itemID + ' not found in the collection.')
                res.send(false)
            }
        })
    },

    /*  return bundles */
    getBundles: function(req, res, next){
        db.findOne(Events, {isCurrentEvent: true}, '', function(resultEvent) {
            if (resultEvent) {
                db.findMany(Bundles, {artistID: req.query.artistID, eventID:resultEvent._id}, req.query.projection, function(result) {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        console.log('Bundle ' + req.query.artistID + ' not found in the collection.')
                        res.send(false)
                    }
                })
            }
            else {
                console.log('no event');
            }
        })
    },

    /*  returns bundles */
    getBundlesProp: function(req, res, next){
        db.findOne(Bundles, {_id: mongoose.Types.ObjectId(req.query.bundleID)}, '', function(result) {
            if (result) {
                res.send(result)
            }
            else {
                console.log('Bundles ' + req.query.bundleID + ' not found in the collection.')
                res.send(false)
            }
        })
    },

    /*  return event */
    getEvent: function(req, res, next){
        db.findOne(Events, {_id: req.query.eventID}, req.query.projection, function(result) {
            if (result) {
                res.send(result)
            }
            else {
                console.log('Event ' + req.query.eventID + ' not found in the collection.')
                res.send(false)
            }
        })
    },

    /*  return event */
    getCurrEvent: function(req, res, next){
        db.findOne(Events, {isCurrentEvent: true}, '', function(result) {
            if (result) {
                res.send(result)
            }
            else {
                console.log('Event not found in the collection.')
                res.send(false)
            }
        })
    },
}

module.exports = adminEditController;