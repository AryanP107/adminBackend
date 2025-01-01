const express = require('express');
const { signin, register } = require('../controllers/admin.controller');
const router = express.Router();

router.post('/signin',signin);
router.post('/register',register);

module.exports = router;

