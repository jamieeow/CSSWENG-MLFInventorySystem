const path = require('path');
const db = require('../models/database.js');
const Items = require('../models/ItemModel.js')
const Artists = require('../models/ArtistModel.js')

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
        var cart = req.body.cart
        
        for (let i = 0; i < cart.length; i++) {
            
            db.findOne(Items, {_id: cart[i].itemID}, 'stockQuantity itemsSold', function(result) {
                
                if (result) {
                    var update = {
                        stockQuantity: result.stockQuantity - parseInt(cart[i].quantity),
                        itemsSold: result.itemsSold + parseInt(cart[i].quantity)
                    }

                    db.updateOne(Items, {_id: cart[i].itemID}, update, function(result1) {
                        console.log(result1)
                    })
                    
                }
                else {
                    console.log('Item ' + cart[i].itemID + ' not found in the collection.')
                }
            })
        }
        
        res.redirect('/');
    },

    /*  add stocks increments stockQuantity */
    postRestock: function(req, res, next){
        db.findOne(Items, {_id: req.body.item}, 'stockQuantity', function(result) {
                
            if (result) {
                var update = {
                    stockQuantity: result.stockQuantity + parseInt(req.body.value),
                }
                db.updateOne(Items, {_id: req.body.item}, update, function(result) {})
            }
            else {
                console.log('Item ' + req.body.item + ' not found in the collection.')
            }
        })

        res.redirect('/');
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

module.exports = mainController;