const express = require('express');
const router = express();

const loginController = require("../controllers/loginController");

//These goes to the URL: /login because of Routes in server.js
//get is used when a user chose to log out
router.get('/login', loginController.getLogin);
//post is used when logging in
router.post('/login', loginController.postLogin);
router.get('/li', loginController.getLoginPage);

module.exports = router;