const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    body: { type: String, require: true },
    image: { type: String, require: true },
    author: { type: Object, require: true }
}, {
    timestamps: true
})

const BlogData = new mongoose.model('blogposts', Blog);
module.exports = BlogData;