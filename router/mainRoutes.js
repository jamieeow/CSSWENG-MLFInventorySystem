const express = require('express');
const router = express();

const mainController = require("../controllers/mainController");

//These goes to URL: / because of Routes in server.js
router.get('/', mainController.getMain);
router.post('/orderCheckOut', mainController.postOrderCheckOut);
router.post('/restockItem', mainController.postRestock);
router.get('/getSales', mainController.getItems);

module.exports = router;