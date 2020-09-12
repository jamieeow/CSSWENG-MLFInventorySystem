const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');

const adminAddController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
        //if logged in user is admin
        if (req.session.isAdmin) {
            //find artist then render with details
            db.findMany(Artists, {}, '', result=>{
            
                let artistArray = [];
                let artistItemsArray = [];
                let itemArray = [];

                //push all artistID and artistName to an array to be used in details below
                for (let i=0;i<result.length;i++){
                    artistObj = { //artist object containing artist ID and artist name
                        artistID: result[i].artistID,
                        artistName: result[i].artistName,
                    }
                    artistArray.push(artistObj);
                }

                //push all items to an array to be used in details below
                for (let i=0;i<result.length;i++){ //artist
                    db.findMany(Items,{artistID: result[i].artistID},'', itemResult=>{ //returns item of artist
                        itemArray = []; //empties the item array for the next set of items for artist
                        for (let j=0;j<itemResult.length;j++){ //item
                            itemObj = { //item object containing item info
                                itemID: itemResult[j]._id,
                                itemPicture: itemResult[j].itemPicture,
                                itemName: itemResult[j].itemName,
                                itemPrice: itemResult[j].itemPrice,
                                stocksQuantity: itemResult[j].stockQuantity,
                            }
                            itemArray.push(itemObj); //array of item info
                        }
                        artistItemsObj = { //artist item object containing item info and artist ID
                            artistID: result[i].artistID,
                            item: itemArray,
                        }
                        artistItemsArray.push(artistItemsObj); //array of artist item (this is for artistItems in details)
                    })
                }
                //Set event count down
                db.findOne(Events, {isCurrentEvent: true},'', eventResult=>{
                    var diffDate = parseInt((new Date("09/15/2020") - Date.now())); //change new date to eventresult
                    var minutes = Math.ceil(diffDate / (1000 * 60));
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours/24);
                    hours = hours%24;

                    db.findMany(Items, {}, 'itemSold', itemResult=>{
                        var sold=0;
                        for (let i; i<itemResult.length;i++) {
                            sold += itemResult[i].itemSold;
                        }
                        //details of admin page
                        var details = {
                            artist: artistArray,
                            artistItems: artistItemsArray,
                            daysLeft: days,
                            hoursLeft: hours,
                            totalSold: sold,
                        }
                        if (result){
                            res.render('admin',details)
                        }
                        else {
                            res.render('admin')
                        }
                    })
                })     
            })
        }
        // if the logged in user is not an admin, therefore a cashier
        else if (req.session.isAdmin == false) {
            res.redirect('/main')
        } 
        
        // if the user is not logged in
        else res.redirect('/')
        
    },

    //Add artist to database
    postAddArtist: function(req, res, next){
        data = {
            _id: new mongoose.Types.ObjectId(),
            artistID: req.body.newArtistIDNo,
            artistName: req.body.newArtistName
        }
        db.insertOne(Artists, data, result=>{
            if (result) {
                console.log("Successfully added artist to the artists collection");
            }
            else {
                console.log("Error adding artist to the artists collection");
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
                    artistID: req.body.itemSelectedArtist,
                    eventID: new mongoose.Types.ObjectId(), //temp
                    itemName: req.body.newItemName,
                    itemPrice: req.body.newPriceStock,
                    stockQuantity: req.body.newStockQuantity,
                    itemsSold: 0,
                    itemPicture: '/photo/'+ req.file.originalname,
                }
                
                db.insertOne(Items, data, result=>{
                    if (result) {
                        console.log("Successfully added item to the items collection");
                    }
                    else {
                        console.log("Error adding item to the items collection");
                    }
                });
                
                res.redirect('/admin');
            }
        })
    },

    //Add bundle to database
    postAddBundle: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
        const upload = multer({
            storage: storage
        }).single('BundlePhotoPicker');

        upload(req, res, (err) => {
            if (!err){
                data = {
                    _id: new mongoose.Types.ObjectId(),
                    artistID: req.body.bundleSelectedArtist,
                    eventID: new mongoose.Types.ObjectId(), //temp
                    includedItems: req.body.selectedItems,
                    bundleName: req.body.newBundleName,
                    bundlePrice: req.body.newPriceStock,
                    bundleSold: 0,
                    bundleStock: req.body.newStockQuantity,
                    bundlePicture: '/photo/'+ req.file.originalname,
                }
                
                db.insertOne(Bundles, data, result=>{
                    if (result) {
                        console.log("Successfully added bundle to the bundles collection");
                    }
                    else {
                        console.log("Error adding bundle to the bundles collection");
                    }
                });
                
                res.redirect('/admin');
            }
        })
    },
    
}

module.exports = adminAddController;