const db = require('./models/database.js');
const Admins = require('./models/AdminModel.js');
const Artists = require('./models/ArtistModel.js');
const Bundles = require('./models/BundleModel.js');
const Cashiers = require('./models/CashierModel.js');
const Events = require('./models/EventModel.js');
const Items = require('./models/ItemModel.js');

db.connect();

db.deleteMany(Admins, {}, callback=>{
    db.deleteMany(Artists, {}, callback=>{
        db.deleteMany(Bundles, {}, callback=>{
            db.deleteMany(Cashiers, {}, callback=>{
                db.deleteMany(Events, {}, callback=>{
                    db.deleteMany(Items, {}, callback=>{
                        db.close();
                    });
                });
            });
        });
    });
});