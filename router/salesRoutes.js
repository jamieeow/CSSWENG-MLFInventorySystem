const express = require('express');
const router = express();

const salesController = require("../controllers/salesController");

router.get('/getSorted', salesController.sortItemBundles);
router.get('/export', salesController.exportReport);

module.exports = router;