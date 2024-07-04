const { validationResult } = require('express-validator')

exports.createBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    const created_at = req.body.created_at;
    const name = req.body.name;

    const { errors } = validationResult(req);

    const blogData = {
        title,
        image,
        body,
        created_at,
        "author": {
            "uid": 1,
            name
        }
    }

    if (errors.length > 0) {
        const err = new Error('invalid input blog');
        err.status = 400;
        err.data = errors;

        throw (err);
    } else {
        res.status(201).json(blogData)
    }
}