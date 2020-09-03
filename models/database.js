const mongoose = require('mongoose');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
//Database name
const databaseName = 'MalateLiteraryFolio'
//Database url
const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false;'
// Place all schemas here
const admin = require('./AdminModel.js');
const artist = require('./ArtistModel.js');
const bundle = require('./BundleModel.js');
const cashier = require('./CashierModel.js');
const event = require('./EventModel.js');
const item = require('./ItemModel.js');

const options1 = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

const options2 = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

const database = {
    // connects to database
    connect: function() {
        try {
            mongoose.connect(url, options2, function(error) {
                console.log('Database connection success! Connected to: ' + url);
            })
        } 
        catch(e) {
            console.log(e);
        }
    },

    //close the database
    close: function() {
        try {
            console.log('Disconnecting. . .')
            mongoose.disconnect((err)=>{
                console.log('Disconnected to database.')
            })
        } 
        catch(e){
            console.log(e);
        }
    },

    //create the database
    createDatabase: function(){
        client.connect(url, options1, (err, db)=>{
            if(err) {
                throw err;
            }
            else{
                console.log('Database has been created.');
            }
            db.close();
        })
    },

    //create collection
    createCollection: function(collectionName){
        client.connect(url, options1, (err, db)=>{
            if(err){
                throw err;
            }

            let database = db.db(databaseName);
            database.createCollection(collectionName, (err, res)=>{
                if(err) {
                    throw err;
                }
                else{
                    console.log('Collection `' + collectionName + '` created.');
                }
                db.close();
            });
        });
    },

    // inserts a single `doc` to the database based on the model `model`
    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error){
                console.log('In insertion:')
                console.log(error)
                return callback(false);
            } 
            console.log('Added:');
            console.table(result.toObject());
            return callback(true);
        });
    },

    // inserts multiple `docs` to the database based on the model `model`
    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error){
                return callback(false);
            }
            console.log('Added:');
            console.table(result.toObject());
            return callback(true);
        });
    },

    // searches for a single document based on the model `model`
    // filtered through the object `query`
    // limits the fields returned based on the string `projection`
    // callback function is called after the execution of findOne() function
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) {
                return callback(false);
            }
            return callback(result);
        });
    },

    // searches for multiple documents based on the model `model`
    // filtered through the object `query`
    // limits the fields returned based on the string `projection`
    // callback function is called after the execution of findMany() function
    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) {
                return callback(false);
            }
            return callback(result);
        });
    },

    // updates the value defined in the object `update`
    // on a single document based on the model `model`
    // filtered by the object `filter`
    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) {
                return callback(false);
            }
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    // updates the value defined in the object `update`
    // on multiple documents based on the model `model`
    // filtered using the object `filter`
    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) {
                return callback(false);
            }
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    // deletes a single document based on the model `model`
    // filtered using the object `conditions`
    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) {
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    // deletes multiple documents based on the model `model`
    // filtered using the object `conditions`
    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) {
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

module.exports = database;