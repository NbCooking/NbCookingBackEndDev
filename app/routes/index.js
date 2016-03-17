var express = require('express');
var router = express.Router();
var pages = require('../controllers/Pages');
var offers = require('../controllers/Offers');

/* GET */
router.get('/', pages.home);

router.get('/about', pages.about);

router.get('/cgu', pages.cgu);

router.post('/', offers.search);

module.exports = router;