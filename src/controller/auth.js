const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')

const handleError = (message, status, data = []) => {
    const err = new Error(message);
    err.status = status;
    err.data = data;
    return err;
}

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { errors } = validationResult(req);
    if (errors.length > 0) {
        next(handleError('Invalid input value', 400))
    }

    try {
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // hashing = bertujuan untuk ubah data input password menjadi string panjang acak
        // saltRounds = parameter algoritma bcrypt untuk menentukan seberapa banyak pengulangan atau kompleksitas dalam hashing (security)
        // saltRounds = harus 10 - 12
        // $2b$12$gkMdTLWFW9/OetrIi.gM1OM0K8bIuJY.ZYNiiSL0HQkL7yzQkHj.K = 12

        const user = new User({ name, email, password: hashedPassword })
        const data = await user.save();
        res.status(201).json({
            message: "Success input new user",
            data
        });
    } catch (error) {
        const msg = error.errorResponse.errmsg || 'Registration Failed';
        next(handleError(msg, 400))
    }
}

// PROSES TOKEN
const privateKey = fs.readFileSync(path.join(__dirname, '../../key.pem'));

exports.login = async (req, res, next) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return next(handleError("user not found", 400))
            // return = proses akhir aplikasi
            // teknik tuk reduce penggunaan if else
        }
        const correctPassword = await bcrypt.compare(password, user.password); // boolean;
        if (!correctPassword) {
            return next(handleError("Invalid Password", 400))
        }
        const token = jwt.sign({ userId: user.data?._id }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
        res.status(201).json({ token })

    } catch (error) {
        console.log(error);
        const msg = error.errorResponse?.errmsg || 'Authentication Failed';
        next(handleError(msg, 400))
    }
}