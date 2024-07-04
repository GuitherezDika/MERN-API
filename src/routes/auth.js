const express = require('express');
const { body } = require('express-validator')

const router = express.Router();

const authController = require('../controller/auth');
const { register } = authController;

router.post(
    '/register',
    [
        body('name').isLength({ min: 6 }).withMessage('Minimum length is 6 chars'),
        body('email').isEmail().withMessage('Not a valid e-mail address'),
        body('password').isLength({ min: 6 }).withMessage('Minimum length is 6 chars')
    ],
    register
)
module.exports = router;