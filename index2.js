const express = require('express')

const app = express()
const router = express.Router();
const port = 3000;

// basic example basic routing with middleware function
// Authentication Middleware Function
const authenticate = (req, res, next) => {
    const isAuthenticated = true;
    if(isAuthenticated){
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // [2024-07-03T03:13:11.074Z] GET /profile
    next()
}

// protected route with single authentication middleware
// app.get('/profile', authenticate, (req, res) => {
//     res.send('Welcome to your profile')
// })

// multiple middleware
app.get('/profile', logRequest, authenticate, (req, res) => {
    res.send('Welcome to your profile')
})

app.listen(port, () => {
    console.log('Listen the port succeed')
})