const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mern_db'
const options = { useNewUrlParser: true };

async function connectToDatabase() {
    try {
        const con = await mongoose.connect(url, options);
        console.log('DB Succed ----->>>>', con.connection.collections);
        console.log('DB model ----->>>>', con.connection.model);
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB', error);
    }
}

module.exports = connectToDatabase;
