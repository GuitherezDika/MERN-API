const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const productRoutes = require('./src/routes/products');


// middleware handle parsing form data client
// extended = true -> diperbolehkan nested object
// CARA 1 -> di set agar router bisa akses client data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
