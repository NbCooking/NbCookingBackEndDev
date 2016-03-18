var express = require('express');
var router = express.Router();
var users = require('../controllers/Users');

/* GET */
router.get('/', users.form);
/* POST */
router.post('/', users.subscribe);

module.exports = router;