// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
_id - ID of admin
userName - username of admin account
password - password of admin account
*/
const AdminSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    userName: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model("Admins", AdminSchema);