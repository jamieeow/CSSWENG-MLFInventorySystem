// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of bundle
artistID - ID of artist (foreign key)
eventID - ID of event (foreign key)
itemName - Name of item
itemPrice - Price of item
stockQuantity - Stock of item
itemSold - Number of item currently sold
itemPicture - URL of item picture
*/
const ItemSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    artistID: { type: Number, required: true },
    eventID: { type: Schema.Types.ObjectId, ref: 'Event' },
    itemName: {type: String, required: true},
    itemPrice: {type: Number, required: true},
    stockQuantity: {type: Number, required: true},
    itemsSold: {type: Number, required: true},
    itemPicture: {type: String, required: true},
});

module.exports = mongoose.model("Items", ItemSchema);