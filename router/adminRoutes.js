const express = require('express');
const router = express();

const loginController = require("../controllers/adminController");

//get admin page
router.get('/admin', loginController.getLoginAdmin);
//post is used when logging in
router.post('/admin', loginController.postLoginAdmin);
//adds artist to database
router.post('/admin/addArtist', loginController.postAddArtist);

module.exports = router;