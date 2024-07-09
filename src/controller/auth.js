const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        const err = new Error('Invalid input value.')// set global error description
        err.status = 400;
        err.data = errors;
        return next(err) // -> kirim error ke root application
    }
    try {
        const user = new User({ name, email, password })
        const data = await user.save();
        res.status(201).json({
            message: "Success input new user",
            data
        });
    } catch (error) {
        // nampung error saat validasi dari mongodb misal email duplicate
        console.log(error.errorResponse.errmsg);
        const err = new Error(error.errorResponse.errmsg)
        err.status = 400;
        err.data = [];

        next(err)
    }
}