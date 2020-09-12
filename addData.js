const db = require('./models/database.js');
const mongoose = require('mongoose');
const Admins = require('./models/AdminModel.js');
const Artists = require('./models/ArtistModel.js');
const Bundles = require('./models/BundleModel.js');
const Cashiers = require('./models/CashierModel.js');
const Events = require('./models/EventModel.js');
const Items = require('./models/ItemModel.js');

db.connect();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//TODO: populate the database using insertOne

var user = {
    userName: "admin",
    password: "pw123"
};

bcryptjs.hash(user.password, saltRounds, function(err, hash) {
    user.password = hash
    db.insertOne(Admins, user, function(flag) {
        console.log(flag)
    })
})