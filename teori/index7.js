// ERROR HANDLING
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

// router.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     // res.send('OK')
//     next()
// })
// // error handling = 4 parameters 


app.use((req, res, next) => {
    next()
});
app.get('/', (req, res)=> {
    res.send('Hello world!')
})

// route
app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!');
    next(err) // hit middleware error handling
})

// route async
app.get('/async-error', async(req, res, next) => {
    try {
        // await asyncFunction()
        res.send('Async function succeeded')
    } catch (error) {
        next(error)
    }
})

// middleware error handling 
app.use((err, req, res, next) => {
    console.log(1);
    console.error('-->',err.stack);
    res.status(500).send('Something broke!')
})

// handle kesalahan route path PALING AKHIR
app.use((req, res, next) => {
    res.status(400).send('Sorry, we could not find that!')
})

// run server
app.listen(port, ()=> console.log('run on port 3000'))
