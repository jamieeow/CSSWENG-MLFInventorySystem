const db = require('./models/database.js');

db.createDatabase();
db.createCollection("admins");
db.createCollection("artists");
db.createCollection("bundles");
db.createCollection("cashiers");
db.createCollection("events");
db.createCollection("items");