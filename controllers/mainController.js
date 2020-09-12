const path = require('path');
const db = require('../models/database.js');
const Items = require('../models/ItemModel.js')
const Bundles = require('../models/BundleModel.js')
const Artists = require('../models/ArtistModel.js');
const { send } = require('process');

const mainController = {
    //Render main page
    getMain: function(req, res, next){
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

            //details of main page
            var details = {
                artist: artistArray
            }

            if (result){
                res.render('main',details)
            }
            else {
                res.render('main')
            }            
        })
    },

    /*  new order decrements stockQuantity and increments itemSold */
    postOrderCheckOut: function(req, res, next){
        var items = req.body.items
        var bundles = req.body.bundles
        var success = true;
        
        for (let i = 0; items && i < items.length; i++) {
            
            db.findOne(Items, {_id: items[i].itemID}, 'stockQuantity itemsSold', function(result) {
                
                if (result) {
                    var update = {
                        stockQuantity: result.stockQuantity - parseInt(items[i].quantity),
                        itemsSold: result.itemsSold + parseInt(items[i].quantity)
                    }

                    db.updateOne(Items, {_id: items[i].itemID}, update, function(result1) {
                        success = result
                    })
                    
                }
                else {
                    console.log('Item ' + items[i].itemID + ' not found in the collection.')
                }
            })
        }
        
        for (let i = 0; bundles && i < bundles.length; i++) {
            
            db.findOne(Bundles, {_id: bundles[i].itemID}, 'bundleStock bundleSold', function(result) {
                
                if (result) {
                    var update = {
                        bundleStock: result.bundleStock - parseInt(bundles[i].quantity),
                        bundleSold: result.bundleSold + parseInt(bundles[i].quantity)
                    }

                    db.updateOne(Bundles, {_id: bundles[i].itemID}, update, function(result1) {
                        success = success && result1
                    })
                    
                }
                else {
                    console.log('Bundle ' + bundles[i].itemID + ' not found in the collection.')
                }
            })
        }
        res.send(success)

    },

    /*  add stocks increments stockQuantity */
    postRestock: function(req, res, next){

        if (req.body.itemType == 'item') {
            db.findOne(Items, {_id: req.body.item}, 'stockQuantity', function(result) {
                    
                if (result) {
                    var update = {
                        stockQuantity: result.stockQuantity + parseInt(req.body.value),
                    }
                    db.updateOne(Items, {_id: req.body.item}, update, function(result1) {
                        res.send(result1)
                    })
                }
                else {
                    console.log('Item ' + req.body.item + ' not found in the collection.')
                }
            })
        } else {
            db.findOne(Bundles, {_id: req.body.item}, 'bundleStock', function(result) {
                    
                if (result) {
                    var update = {
                        bundleStock: result.bundleStock + parseInt(req.body.value),
                    }
                    db.updateOne(Bundles, {_id: req.body.item}, update, function(result1) {
                        res.send(result1)
                    })
                }
                else {
                    console.log('Bundle ' + req.body.item + ' not found in the collection.')
                }
            })
        }
    },

    /*  returns all items of a specific artist */
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

    /*  returns all bundles of a specific artist */
    getBundles: function(req, res, next){
        db.findMany(Bundles, {artistID: req.query.artistID}, req.query.projection, function(result) {
                
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

module.exports = mainController;