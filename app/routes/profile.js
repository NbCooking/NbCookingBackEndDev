var express = require('express');
var router = express.Router();
var users = require('../controllers/Users');

/* GET */
router.get('/', users.getProfile);
router.get('/:id(\\d+)', users.getProfileId);

module.exports = router;