// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of the event
eventName - Name of the event
*/
const EventSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    eventName: {type: String, required: true},
});

module.exports = mongoose.model("Event", EventSchema);