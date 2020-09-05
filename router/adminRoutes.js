const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");

//get admin page
router.get('/admin', adminController.getLoginAdmin);
/*
//post is used when logging in
router.post('/admin', loginController.postLoginAdmin);
*/
//adds artist to database
router.post('/admin/addArtist', adminController.postAddArtist);
//adds item to database
router.post('/admin/addItem', adminController.postAddItem);
//adds bundle to database
router.post('/admin/addBundle', adminController.postAddBundle);

module.exports = router;