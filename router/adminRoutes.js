const express = require('express');
const router = express();

const adminAddController = require('../controllers/adminAddController');
const adminEditController = require('../controllers/adminEditController');
const adminDeleteController = require('../controllers/adminDeleteController');

//get admin page
router.get('/admin', adminAddController.getLoginAdmin);
router.get('/admin/getArtist', adminEditController.getArtist);
router.get('/admin/getItems', adminEditController.getItems);
router.get('/admin/getBundles', adminEditController.getBundles);
router.get('/admin/getEvent', adminEditController.getEvent);
router.get('/admin/getCurrEvent', adminEditController.getCurrEvent);
router.get('/admin/getItemsProp', adminEditController.getItemsProp);
router.get('/admin/getBundlesProp', adminEditController.getBundlesProp);

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
router.post('/admin/deleteArtist', adminDeleteController.postRemoveArtist);
//remove item
router.post('/admin/deleteItem', adminDeleteController.postRemoveItem);
//remove bundle
router.post('/admin/deleteBundle', adminDeleteController.postRemoveBundle);
//remove event
router.post('/admin/deleteEvent', adminDeleteController.postRemoveEvent);
module.exports = router;