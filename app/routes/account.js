var express = require('express');
var router = express.Router();
var users = require('../controllers/Users');

/* GET */
router.get('/', users.getAccount);
router.post('/', users.login);
router.get('/disconnect', users.disconnect);
module.exports = router;