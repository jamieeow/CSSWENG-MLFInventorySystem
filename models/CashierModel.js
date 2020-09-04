// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of artist
artistID - object ID of artist to access its name and student ID number
password - password of cashier
*/
const CashierSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    artistID: { type: Number, required: true },
    password: {type: String, required: true},
});

module.exports = mongoose.model("Cashiers", CashierSchema);