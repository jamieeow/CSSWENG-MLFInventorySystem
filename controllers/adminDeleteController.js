const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');

const adminDeleteController = {
    //delete artist from the database (this also removes item and bundle associated with the artist from the database)
    deleteRemoveArtist: function(req, res, next){
        db.deleteOne(Artists,{"_id": req.body.artistID},result=>{});
        res.redirect('/admin');
    },

    //delete item from the database
    deleteRemoveItem: function(req, res, next){
        db.deleteOne(Items,{"_id": req.body.itemID},result=>{});
        res.redirect('/admin');
    },

    //delete bundle from the database
    deleteRemoveBundle: function(req, res, next){
        db.deleteOne(Bundles,{"_id": req.body.bundleID},result=>{});
        res.redirect('/admin');
    },

    //delete event from the database
    deleteRemoveEvent: function(req, res, next){
        db.deleteOne(Events,{"_id": req.body.eventID},result=>{});
        res.redirect('/admin');
    },

}

module.exports = adminDeleteController;