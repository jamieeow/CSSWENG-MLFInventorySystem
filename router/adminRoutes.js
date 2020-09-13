const express = require('express');
const router = express();

const adminAddController = require('../controllers/adminAddController');
const adminEditController = require('../controllers/adminEditController');
const adminDeleteController = require('../controllers/adminDeleteController');

//get admin page
router.get('/admin', adminAddController.getLoginAdmin);
router.get('/admin/getArtist', adminEditController.getArtist);

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
router.put('/admin/editArtist', adminEditController.putEditArtist);
//edit item
router.post('/admin/editItem', adminEditController.postEditItem); //post for image?
//edit bundle
router.post('/admin/editBundle', adminEditController.postEditBundle); //post for image?
//edit event
router.put('/admin/editEvent', adminEditController.putEditEvent);

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