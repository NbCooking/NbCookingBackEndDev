var express = require('express');
var router = express.Router();
var orders = require('../controllers/Orders');

/* GET */
router.get('/', orders.getCart);

module.exports = router;