const express = require('express');
const router = express();

const mainController = require("../controllers/mainController");

//These goes to URL: / because of Routes in server.js
router.get('/main', mainController.getMain);
router.post('/orderCheckOut', mainController.postOrderCheckOut);
router.post('/restockItem', mainController.postRestock);
router.get('/getItems', mainController.getItems);
router.get('/getBundles', mainController.getBundles);
router.get('/getSorted', mainController.sortItemBundles);

module.exports = router;