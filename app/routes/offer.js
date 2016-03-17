var express = require('express');
var router = express.Router();
var offers = require('../controllers/Offers');
var comments = require('../controllers/Comments');

/* GET */
router.get('/:id', offers.getOfferId);
router.get('/', offers.addOffer);

/* POST */
router.post('/', offers.addOfferId);

router.post('/:id(\\d+)', comments.addComment);

module.exports = router;