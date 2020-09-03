// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of bundle
artistID - ID of artist (foreign key)
eventID - ID of event (foreign key)
includedItems - List of Item names (Array of Strings)
bundleName - Name of bundle
bundlePrice - Price of bundle
bundleSold - Number of bundles currently sold
bundleStock - Number of stocks the bundle currently have
*/
const BundleSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    artistID: { type: Number, required: true },
    eventID: { type: Schema.Types.ObjectId, ref: 'Event' },
    includedItems: {type: Array, required: true},
    bundleName: {type: String, required: true},
    bundlePrice: {type: Number, required: true},
    bundleSold: {type: Number, required: true},
    bundleStock: {type: Number, required: true},
});

module.exports = mongoose.model("Bundle", BundleSchema);