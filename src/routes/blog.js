const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const createBlogController = require('../controller/blog');
const { createBlog, getAllBlog, getOneBlog, updateBlog, deleteOneBlog, getDataByPagination } = createBlogController;

router.post(
    '/create-blog',
    [
        body('title').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
        body('body').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
    ],
    createBlog
);

router.get('/get-blogs', getAllBlog)
router.get('/get-blog/:_id', getOneBlog)
// sebagai path variable = http://localhost:3000/v1/blog/get-blogs/:668744463d2470a142107e30
router.patch(
    '/update-blog/:_id',
    [
        body('title').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
        body('body').isLength({ min: 3 }).withMessage('minimum input value is 3 chars'),
    ],
    updateBlog
)
router.delete('/delete-blog/:_id', deleteOneBlog)
router.get('/pagination', getDataByPagination);// perlu query parameter page dan limit
// http://localhost:3000/v1/blog/pagination?page=3&limit=4

module.exports = router;