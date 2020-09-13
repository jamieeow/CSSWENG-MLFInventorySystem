const express = require('express');
const router = express();

const adminAddController = require('../controllers/adminAddController');
const adminEditController = require('../controllers/adminEditController');
const adminDeleteController = require('../controllers/adminDeleteController');

//get admin page
router.get('/admin', adminAddController.getLoginAdmin);
router.get('/admin/getArtist', adminEditController.getArtist);
router.get('/admin/getItems', adminEditController.getItems);
router.get('/admin/getEvent', adminEditController.getEvent);

/*Add functions*/
//adds artist to database
router.post('/admin/addArtist', adminAddController.postAddArtist);
//adds item to database
router.post('/admin/addItem', adminAddController.postAddItem);
//adds bundle to database
router.post('/admin/addBundle', adminAddController.postAddBundle);
//add event to database
router.post('/admin/addEvent', adminAddController.postAddEvent);

/*Edit functions*/
//edit artist
router.post('/admin/editArtist/', adminEditController.postEditArtist);
//edit item
router.post('/admin/editItem', adminEditController.postEditItem);
//edit bundle
router.post('/admin/editBundle', adminEditController.postEditBundle);
//edit event
router.post('/admin/editEvent', adminEditController.postEditEvent);

/*Delete functions*/
//remove artist (this also removes all items and bundles associated with the artist)
router.delete('/admin/deleteArtist', adminDeleteController.deleteRemoveArtist);
//remove item
router.delete('/admin/deleteItem', adminDeleteController.deleteRemoveItem);
//remove bundle
router.delete('/admin/deleteBundle', adminDeleteController.deleteRemoveBundle);
//remove event
router.delete('/admin/deleteEvent', adminDeleteController.deleteRemoveEvent);
module.exports = router;