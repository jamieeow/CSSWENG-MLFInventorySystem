const express = require('express');
const router = express();

const mainController = require("../controllers/mainController");

//These goes to URL: / because of Routes in server.js
router.get('/', mainController.getMain);
router.post('/orderCheckOut', mainController.postOrderCheckOut);
router.post('/addArtist', mainController.postAddArtist);
router.post('/addItem', mainController.postAddItem); //Not working for some reason
router.post('/addPromo', mainController.postAddPromo);

module.exports = router;