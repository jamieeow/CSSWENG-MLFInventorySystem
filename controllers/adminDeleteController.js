const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');
const Cashiers = require('../models/CashierModel.js');

const adminDeleteController = {
    //delete artist from the database (this also removes item and bundle associated with the artist from the database)
    postRemoveArtist: function(req, res, next){
        db.deleteOne(Artists,{"artistID": req.body.artistID},result=>{
            if (result) {
                console.log("Removed artist successfully!");
            }
            else {
                console.log("Error removing artist!");
            }
            db.deleteMany(Items,{"artistID": req.body.artistID},result=>{
                if (result) {
                    console.log("Removed items successfully!");
                }
                else {
                    console.log("Error removing items!");
                }
                db.deleteMany(Bundles,{"artistID": req.body.artistID},result=>{
                    if (result) {
                        console.log("Removed bundles successfully!");
                    }
                    else {
                        console.log("Error removing bundles!");
                    }
                    db.deleteOne(Cashiers,{"artistID": req.body.artistID},result=>{
                        if (result) {
                            console.log("Removed cashier successfully!");
                        }
                        else {
                            console.log("Error removing cashier!");
                        }
                        res.redirect('/admin');
                    });
                });
            });
        });
    },

    //delete item from the database
    postRemoveItem: function(req, res, next){
        db.deleteOne(Items,{"_id": req.body.itemID},result=>{
            if (result) {
                console.log("Removed successfully!");
            }
            else {
                console.log("Error removing!");
            }
        });
        res.redirect('/admin');
    },

    //delete bundle from the database
    postRemoveBundle: function(req, res, next){
        db.deleteOne(Bundles,{"_id": req.body.bundleID},result=>{
            if (result) {
                console.log("Removed successfully!");
            }
            else {
                console.log("Error removing!");
            }
        });
        res.redirect('/admin');
    },

    //delete event from the database
    postRemoveEvent: function(req, res, next){
        db.deleteOne(Events,{"_id": req.body.eventID},result=>{
            if (result) {
                console.log("Removed successfully!");
            }
            else {
                console.log("Error removing!");
            }
        });
        res.redirect('/admin');
    },

}

module.exports = adminDeleteController;