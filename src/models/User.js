const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
    // createdAt & updatedAt
})

const User = mongoose.model('users', userSchema);
// 'users' = nama collection pada database
module.exports = User;