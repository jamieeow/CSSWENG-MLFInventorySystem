const express = require('express');
const router = express();

const mainController = require("../controllers/mainController");

//These goes to URL: / because of Routes in server.js
router.get('/', mainController.getMain);
router.post('/orderCheckOut', mainController.postOrderCheckOut);
router.post('/restockItem', mainController.postRestock);
router.post('/reserveStocks', mainController.postReserve); //Not working for some reason
router.post('/addPromo', mainController.postPromo);

module.exports = router;