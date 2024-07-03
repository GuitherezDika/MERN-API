const express = require('express');
const app = express();
const router = express.Router()
const port = 3000;

app.get('/profile', (req, res) => {
    res.send("get profile OK, get method to access Entire Application ")
})

// Router - Level Middleware
// router.use((req, res, next) => {
//     console.log('this middleware runs for routes defined by the router.');
//     // res.send('OK') // harus ada agar client dapat respond kecuali langsung di bypass menggunakan next()
//     // responds dari middleware function lainnya
//     // error yang muncul bila suda di bypass tapi pada middleware selanjutnya tidak memunculkan res.send
//     // -> 404 not found
//     next()
// })
// // router harus di panggil dalam app express
// // function middleware akan selalu di panggil di tiap Path "/myapp" di port 3000
// // DONE
// app.use('/myapp', router);

app.use((req, res, next) => {
    // middleware function selalu dipanggil di tiap request port 3000 
    console.log('Time: ', Date.now());
    next()
})
app.use('/user/:id', (req, res, next) => {
    // middleware function selalu dipanggil di tiap request on "/user/:id" path on port 3000 
    console.log('Request type = ', req.method);
    next()
})
app.get('/user/:id', (req, res, next) => {
    res.send("USER")
})

app.use('/profile/:id', (req, res, next) => {
    console.log('Request URL = ', req.originalUrl);
    next()
}, (req, res, next) => {
    console.log('Request Method ', req.method)
    next()
    // tidak bisa res.send() -> harus bypass dengan function next
})

// app.get('/profile/:id', (req, res, next) => {
//     console.log('Request URL2 = ', req.originalUrl);
//     res.send('DONE')
// })

// bisa juga
app.get('/profile/:id', (req, res, next) => {
    console.log('Request URL2 = ', req.originalUrl);
    if (req.params.id == 12) {
        next('route') // hit next route app -> print `special id = ${req.params.id}`
    }
    else {
        next() // -> callback function "User Info"
    }
}, (req, res) => {
    res.send("User Info")
    // app stop -> print User Info
})

app.get('/profile/:id', (req, res) => {
    // 
    res.send(`special id = ${req.params.id}`)
})

app.listen(port, () => {
    console.log('run on port 3000');
})