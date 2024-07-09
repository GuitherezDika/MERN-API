const { validationResult } = require('express-validator')
// const BlogPost = require('../models/blog');
const BlogData = require('../models/blog');

exports.createBlog = async (req, res, next) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) {
        let err = new Error('invalid input blog');
        err.status = 400;
        err.data = errors;
        return next(err);
    }

    if (!req.file) { // uploaded file
        let err = new Error('Image harus di upload!');
        err.status = 422;
        err.data = errors;
        return next(err);
    }

    const { title, body, name } = req.body;
    const image = req.file.path;

    try {
        const blog = new BlogData({
            title,
            body,
            image,
            author: {
                uid: 1,
                name
            }
        })
        const data = await blog.save();
        res.status(201).json({
            message: 'Create Blog Success',
            data
        })
    } catch (error) {
        const err = new Error(error.errorResponse.errmsg)
        err.status = 400;
        err.data = [];

        next(err)
    }
}