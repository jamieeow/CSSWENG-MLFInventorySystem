const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');

const adminController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
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

            for (let i=0;i<result.length;i++){ //artist
                db.findMany(Items,{artistID: result[i].artistID},'', itemResult=>{ //returns item of artist
                    itemArray = [];
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

            //details of admin page
            var details = {
                artist: artistArray,
                artistItems: artistItemsArray,
                /*
                artistItems: [{
                    artistID: 1,
                    item: [{
                        itemID: 001,
                        itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                        itemName: "Item 1",
                        itemPrice: 5.00,
                        stocksQuantity: 20
                    },{
                        itemID: 002,
                        itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                        itemName: "Item 2",
                        itemPrice: 5.00,
                        stocksQuantity: 20
                    },{
                        itemID: 003,
                        itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                        itemName: "Item 3",
                        itemPrice: 5.00,
                        stocksQuantity: 20
                    },{
                        itemID: 004,
                        itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                        itemName: "Item 2",
                        itemPrice: 5.00,
                        stocksQuantity: 20
                    },{
                        itemID: 005,
                        itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                        itemName: "Item 3",
                        itemPrice: 5.00,
                        stocksQuantity: 20
                    }]
                }]
                */
            }

            if (result){
                res.render('admin',details)
            }
            else {
                res.render('admin')
            }            
        })
        
    },

    //Add artist to database
    postAddArtist: function(req, res, next){
        data = {
            _id: new mongoose.Types.ObjectId(),
            artistID: req.body.artistID,
            artistName: req.body.artistName
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
        data = {
            _id: new mongoose.Types.ObjectId(),
            //artistID: req.body.artistID,
            //eventID:,
            //includedItems:,
            //bundleName:,
            //bundlePrice:,
            //bundleSold:,
            //bundleStock:,
        }

        /*
        db.insertOne(Bundles, data, result=>{
            if (result) {
                console.log("Successfully added bundle to the bundles collection");
            }
            else {
                console.log("Error adding bundle to the bundles collection");
            }
        });
        */
        res.redirect('/admin');
    },
    
}

module.exports = adminController;