const db = require('./models/database.js');
const mongoose = require('mongoose');
const Admins = require('./models/AdminModel.js');

db.connect();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

var user = {
    userName: "admin",
    password: "pw123",
    _id: new mongoose.Types.ObjectId(),
};

bcryptjs.hash(user.password, saltRounds, function(err, hash) {
    user.password = hash
    db.insertOne(Admins, user, function(flag) {
        console.log(flag)
    })
})