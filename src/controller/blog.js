const { validationResult } = require('express-validator')
const BlogData = require('../models/blog');
const path = require('path');
const fs = require('fs');

exports.createBlog = async (req, res, next) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) {
        let err = new Error('invalid input blog');
        err.status = 400;
        err.data = errors;
        next(err);
    }

    if (!req.file) { // uploaded file
        let err = new Error('Image harus di upload!');
        err.status = 422;
        err.data = errors;
        next(err);
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

exports.getAllBlog = async (req, res, next) => {
    try {
        const data = await BlogData.find();
        res.status(200).json({
            message: 'Get All Blog Data success',
            data
        })
    } catch (error) {
        const err = new Error(error.errorResponse.errmsg)
        err.status = 400;
        err.data = [];

        next(err)
    }
}

exports.getOneBlog = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const data = await BlogData.findOne({ _id });
        res.status(200).json({
            message: 'Get Blog Data success',
            data
        })
    } catch (error) {
        const err = new Error(error.errorResponse?.errmsg || error?.reason)
        err.status = 400;
        err.data = [];

        next(err)
    }
}

exports.updateBlog = async (req, res, next) => {
    try {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            let err = new Error('invalid input blog');
            err.status = 400;
            err.data = errors;
            next(err);
        }

        if (!req.file) {
            let err = new Error('Image harus di upload!');
            err.status = 422;
            err.data = errors;
            next(err);
        }

        const { title, body, name } = req.body;
        const image = req.file.path;

        const { _id } = req.params;
        const filter = { _id }

        const updatedBlog = {
            title,
            body,
            image,
            author: {
                uid: 1,
                name
            }
        }
        const data = await BlogData.findByIdAndUpdate(filter, updatedBlog, { new: true });

        res.status(200).json({
            message: 'Update Blog Data success',
            data
        })
    } catch (error) {
        const err = new Error(error.errorResponse?.errmsg || error?.reason)
        err.status = 400;
        err.data = [];

        next(err)
    }
}

exports.deleteOneBlog = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const blog = await BlogData.findById(_id);
        const imagePath = path.join(__dirname, '../../' + blog.image)

        // fs.unlink(path, callback)
        fs.unlink(imagePath, async () => {
            // success delete image, then 
            // delete data in database
            await BlogData.findByIdAndDelete(_id);
            res.status(200).json({
                message: 'Delete Blog success'
            })
        })
    } catch (error) {
        const err = new Error('Blog not found!')
        err.status = 400;
        err.data = [];

        next(err)
    }
}

exports.getDataByPagination = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const blogs = await BlogData.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        {/*
            find() = all data retrieved
            sort({createdAt: -1}) = list data dari yang terbaru
            skip = 0 ->> nampilin semua data
            skip = 0 && limit = 5 --> nampilin hanya data 5
            {today20, today19, today18, today17, today16}
            page = 2 && skip = 5 && limit = 5
            {today15, today14, today13, today12, today11}
            page = 3 && skip = 10 && limit = 5
        */}
        const totalBlogs = await BlogData.countDocuments(); // total data = 10;
        const totalPages = Math.ceil(totalBlogs / limit); // 2
        res.status(200).json({
            message: 'OK Blog success',
            data: {
                page, 
                limit, 
                totalBlogs, 
                totalPages, 
                blogs
            }
        })
    } catch (error) {
        const err = new Error('Pagination not set!')
        err.status = 400;
        err.data = [];

        next(err)
    }
}