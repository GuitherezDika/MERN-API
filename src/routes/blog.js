const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const createBlogController = require('../controller/blog');
const { createBlog, getAllBlog } = createBlogController;

router.post(
    '/create-blog',
    [
        body('title').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
        body('body').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
    ],
    createBlog
);

router.get('/get-blogs', getAllBlog)

module.exports = router;