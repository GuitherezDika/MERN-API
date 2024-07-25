const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');

let tokenStore = new Set();

const handleError = (message, status, data = []) => {
    const err = new Error(message);
    err.status = status;
    err.data = data;
    return err;
}

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
const publicCert = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8');

const generateAccessToken = user => {
    return jwt.sign({ userId: user._id, name: user.name }, privateKey, { algorithm: 'RS256', expiresIn: process.env.ACCESS_TOKEN_LIFE })
}

const generateRefreshToken = user => {
    return jwt.sign({ userId: user._id, name: user.name }, privateKey, { algorithm: 'RS256', expiresIn: process.env.REFRESH_TOKEN_LIFE })
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
        const msg = error.message || 'Registration Failed';
        next(handleError(msg, 400))
    }
}

// PROSES TOKEN
exports.login = async (req, res, next) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return next(handleError("user not found", 400))
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return next(handleError("Invalid Password", 400))
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        // res.cookie = create cookie baru dengan 'name', value
        // httpOnly = true -> cookie hanya dapat diakses oleh server 
        // dan tidak dapat diakses / modifikasi oleh JS yang jalan di browser
        res.status(201).json({ accessToken })
    } catch (error) {
        const msg = error.message || 'Authentication Failed';
        next(handleError(msg, 400))
    }
}

// middleware to verify token
exports.verifyToken = async (req, res, next) => {
    const token = req.rawHeaders[1]?.split(' ')[1];
    if (!token) {
        return next(handleError('No token provided', 403))
    };
    jwt.verify(token, publicCert, { algorithms: ['RS256'] }, async (err, decoded) => {
        if (err && err.name == 'TokenExpiredError') {
            return await handleRefreshToken(req, res, next)
        } else if (err) {
            return next(handleError('Fail to authenticate token', 403))
        }
        req.userId = decoded.userId;
        req.name = decoded.name;
        return next();
    })
}

// dipanggil ketika verifyToken udah kadaluarsa
const handleRefreshToken = async (req, res, next) => {
    const refreshToken = req.headers.cookie?.split('=')[1] || req.headers['authorization']?.split(' ')[1].split(' ')[0];
    if (!refreshToken) return next(handleError('No token provided', 403));

    try {
        const userLoggedin = jwt.decode(refreshToken);

        jwt.verify(refreshToken, publicCert, { algorithms: ['RS256'] }, async err => {
            if (err) {
                const user = await User.findOne({ name: userLoggedin.name });
                if (!user) return next(handleError('User not found', 400));

                const newRefreshToken = generateRefreshToken(user);
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
                const newAccessToken = generateAccessToken(user);
                res.status(201).json({ accessToken: newAccessToken });
            }
            return next()
        })
    } catch (error) {
        const msg = error.message || 'Failed to process token';
        return next(handleError(msg, 400));
    }
}

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, publicCert, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}

exports.logout = ( req, res) =>  {
    const token = req.headers['authorization']?.split(' ')[1];
    tokenStore.delete(token);
    res.sendStatus(204)
}
