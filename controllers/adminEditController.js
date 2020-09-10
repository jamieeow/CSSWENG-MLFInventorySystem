const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');

const adminEditController = {
    //Edit artist information (artistID and artistName)
    putEditArtist: function(req, res, next){
        
        res.redirect('/admin');
    },

    //Edit item information (artistID, eventID, itemName, stockQuantity, itemPicture)
    postEditItem: function(req, res, next){
        
        res.redirect('/admin');
    },

    //Edit bundle information (artistID, eventID, itemName, stockQuantity, itemPicture)
    postEditBundle: function(req, res, next){
        
        res.redirect('/admin');
    },

    //Edit event information (startDate, endDate)
    putEditEvent: function(req, res, next){
        
        res.redirect('/admin');
    },
}

module.exports = adminEditController;