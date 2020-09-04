// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of artist
artistID - student ID number of artist (eg. 11801234)
artistName - Name of artist
*/
const ArtistSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	artistID: {type: Number, required: true, unique:true},
    artistName: {type: String, required: true},
});

module.exports = mongoose.model("Artists", ArtistSchema);