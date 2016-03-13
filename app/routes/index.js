var express = require('express');
var router = express.Router();
var offers = require('../controllers/Offers');

/* GET */
router.get('/', offers.getHome);

router.post('/', offers.search);

module.exports = router;