var express = require('express');
var router = express.Router();
var offers = require('../controllers/Offers');
var comments = require('../controllers/Comments');

/* GET */
router.get('/:id(\\d+)', offers.getOfferId);
router.get('/offer', offers.addOffer);

/* POST */
router.post('/', offers.addOfferId);

router.post('/:id(\\d+)', comments.addComment);

module.exports = router;