const express = require('express');
const router = express();

const loginController = require("../controllers/loginController");

//These goes to the URL: /login because of Routes in server.js
//get is used when a user chose to log out
router.get('/', loginController.getLogin);
//post is used when logging in
router.post('/', loginController.postLogin);

module.exports = router;