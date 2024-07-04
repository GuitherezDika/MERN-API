const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const { errors } = validationResult(req);
    const data = ({
        message: 'Register Success',
        data: {
            name,
            email,
            password
        }
    })

    if (errors.length > 0) {
        const err = new Error('Invalid input value.')// set global error description
        err.status = 400;
        err.data = errors;
        throw err; // -> kirim error ke root application

        // handle Error Manual
        // res.status(400).json({
        //     message: `Request error: ${errors[0].msg}`,
        //     data: null
        // })
    } else {
        res.status(201).json(data);
    }
}