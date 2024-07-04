const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const productRoutes = require('./src/routes/products');

// CARA 1 - parsed data dengan third party
app.use(bodyParser.json())

// set header - prevent CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*") // * bisa di akses oleh semua URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// harus terakhir sebelum action listen
app.use('/v1/customer', productRoutes);

app.listen(3000, () => {
    console.log('server run on port 3000');
})
