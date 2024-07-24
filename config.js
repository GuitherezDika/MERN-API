const mongoose = require('mongoose');
const env = require('dotenv').config();

const url = process.env.MONGODB_CONNECTION_URL;

const options = { useNewUrlParser: true };

async function connectToDatabase() {
    try {
        const con = await mongoose.connect(url);
        console.log(' ----->> MongoDB connected', con.connection.models);
        // con.connection.collections
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB', error);
    }
}

module.exports = connectToDatabase;
