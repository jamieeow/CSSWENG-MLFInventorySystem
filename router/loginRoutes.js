const express = require('express');
const router = express();

const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");

//These goes to the URL: /login because of Routes in server.js
//get is used when a user chose to log out
router.get('/login', loginController.getLoginPage);
//post is used when logging in
router.get('/getLogin', loginController.getLogin);
router.post('/postlogin', loginController.postLogin);
router.get('/logout', logoutController.getLogout);

module.exports = router;