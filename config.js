const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mern_db'
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
