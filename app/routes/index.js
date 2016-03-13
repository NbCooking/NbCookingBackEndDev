var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var pages = require('../controllers/Pages');
var offers = require('../controllers/Offers');

/* GET */
router.get('/', pages.home);

router.get('/about', pages.about);

router.get('/cgu', pages.cgu);

/* POST */
=======
var offers = require('../controllers/Offers');

/* GET */
router.get('/', offers.getHome);

>>>>>>> 13c6d4a335f4dee6ecbbfa1b7e2b731d11f29d9e
router.post('/', offers.search);

module.exports = router;