const path = require('path');
const mongoose = require('mongoose');
const db = require('../models/database.js');
const Items = require('../models/ItemModel.js')
const Bundles = require('../models/BundleModel.js')
const Artists = require('../models/ArtistModel.js');
const Events = require('../models/EventModel.js');
const { send } = require('process');
const http = require('http');

const salesController = {
    sortItemBundles: function (req, res, next) {
        db.findOne(Events, {isCurrentEvent: true}, "_id", function(event) {
            if (event) {
                db.findMany(Items, {artistID: req.query.artistID, eventID: event._id}, "itemName itemPrice itemsSold", function(itemRes) {
                    if (itemRes.length > 0) {
                        db.findMany(Bundles, {artistID: req.query.artistID, eventID: event._id}, "bundleName bundlePrice bundleSold", function(bundleRes) {
                            for (var i = 0; i < bundleRes.length; i++) {
                                itemRes[itemRes.length + i] = {
                                    _id: bundleRes[i]._id,
                                    itemName: bundleRes[i].bundleName,
                                    itemPrice: bundleRes[i].bundlePrice,
                                    itemsSold: bundleRes[i].bundleSold
                                }
                            }

                            if (req.query.sort == 'name')
                                itemRes.sort(function(a, b){
                                    var x = a.itemName.toLowerCase();
                                    var y = b.itemName.toLowerCase();
                                    if (x < y) {return -1;}
                                    if (x > y) {return 1;}
                                    return 0;
                                });
                            else if (req.query.sort.includes('price'))  {
                                var sign = 1
                                if (req.query.sort == 'price desc')
                                    sign = -1
                                itemRes.sort(function(a, b){return (a.itemPrice - b.itemPrice) * sign});
                            } else {
                                var sign = 1
                                if (req.query.sort == 'quantity desc')
                                    sign = -1
                                itemRes.sort(function(a, b){return (a.itemsSold - b.itemsSold) * sign});
                            }

                            res.send(itemRes);
                        })
                    } else res.send(false)
                })
            } else res.send(false)
        })
    },

    exportReport: function(req, res, next) {
        db.findOne(Events, {isCurrentEvent: true}, "_id eventName", function(event) {
            if (event) {
                db.findMany(Items, {artistID: req.query.artistID, eventID: event._id}, "", function(itemRes) {
                    var items = [];
                    if (itemRes.length > 0) {
                        for (var i = 0; i < itemRes.length; i++) {
                            items[i] = {
                                itemID: itemRes[i]._id,
                                itemName: itemRes[i].itemName,
                                itemType: 'item',
                                itemPrice: itemRes[i].itemPrice,
                                itemsSold: itemRes[i].itemsSold,
                                stockQuantity: itemRes[i].stockQuantity,
                                includedItems: ""
                            }
                        }

                        db.findMany(Bundles, {artistID: req.query.artistID, eventID: event._id}, "", function(bundleRes) {
                            for (var i = 0; i < bundleRes.length; i++) {
                                items[itemRes.length + i] = {
                                    itemID: bundleRes[i]._id,
                                    itemName: bundleRes[i].bundleName,
                                    itemType: 'bundle',
                                    itemPrice: bundleRes[i].bundlePrice,
                                    itemsSold: bundleRes[i].bundleSold,
                                    stockQuantity: bundleRes[i].bundleStock,
                                    includedItems: bundleRes[i].includedItems,

                                }
                            }
                            
                            if (req.query.sort == 'name')
                                items.sort(function(a, b){
                                    var x = a.itemName.toLowerCase();
                                    var y = b.itemName.toLowerCase();
                                    if (x < y) {return -1;}
                                    if (x > y) {return 1;}
                                    return 0;
                                });
                            else if (req.query.sort.includes('price'))  {
                                var sign = 1
                                if (req.query.sort == 'price desc')
                                    sign = -1
                                items.sort(function(a, b){return (a.itemPrice - b.itemPrice) * sign});
                            } else {
                                var sign = 1
                                if (req.query.sort == 'quantity desc')
                                    sign = -1
                                items.sort(function(a, b){return (a.itemsSold - b.itemsSold) * sign});
                            }

                            var fileTitle = "Artist" + req.query.artistID + "-Event" + event.eventName + "-Sales";
                            res.send({items:items, filename:fileTitle});
                            
                        })
                    } else res.send(false)
                })
            } else res.send(false)
        })
    }
    
}

module.exports = salesController;