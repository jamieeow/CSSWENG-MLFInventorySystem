const db = require('./models/database.js');

db.createDatabase();
db.createCollection("admin");
db.createCollection("artist");
db.createCollection("bundle");
db.createCollection("cashier");
db.createCollection("event");
db.createCollection("item");