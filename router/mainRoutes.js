const express = require('express');
const router = express();

const mainController = require("../controllers/mainController");

//These goes to URL: / because of Routes in server.js
router.get('/', mainController.getMain);

module.exports = router;