const express = require('express');
const router = express.Router();

const createBlogController = require('../controller/blog');
const { createBlog } = createBlogController;

router.post('/create-blog', createBlog);

module.exports = router;