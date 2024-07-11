const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const { errors } = await validationResult(req);
        if (errors.length > 0) {
            const err = new Error('Invalid input value.')// set global error description
            err.status = 400;
            err.data = errors;
            next(err) // -> kirim error ke root application
        }

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
        const err = new Error(error.errorResponse?.errmsg || 'Registration Failed')
        err.status = 400;
        err.data = [];

        next(err)
    }
}