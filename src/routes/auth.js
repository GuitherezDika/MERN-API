const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');
const { register } = authController;

router.post('/register', register)
module.exports = router;