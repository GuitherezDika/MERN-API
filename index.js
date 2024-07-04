const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog')

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
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status;
    const errMessage = err.Error;
    const data = err.data;
    
    res.status(errorStatus).json({
        message: errMessage,
        data
    })
})
app.listen(3000, () => {
    console.log('server run on port 3000');
})
