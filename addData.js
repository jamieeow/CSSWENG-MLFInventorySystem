const db = require('./models/database.js');
const mongoose = require('mongoose');
const Admins = require('./models/AdminModel.js');
const Artists = require('./models/ArtistModel.js');
const Bundles = require('./models/BundleModel.js');
const Cashiers = require('./models/CashierModel.js');
const Events = require('./models/EventModel.js');
const Items = require('./models/ItemModel.js');

db.connect();

//TODO: populate the database using insertOne