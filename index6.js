const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

{/*
    1.set init router -> router.use() <==> middleware function with no path
    // untuk awalan cek -> router.use -> return res.send('OK')
    
    2. define an entire application api + router
    app.use('....', router)
    app.listen(port, ....)

    3. create middleware sub-stack with path (/:id)
    4. create middleware sub-stack with specific Method (GET)
    5. create middleware sub-stack with specific Method (GET) Final
    
    cek 1 = http://localhost:3000/app
    postman = OK
    cek 3 = http://localhost:3000/app/:id
    postman = OKK
*/}

// 1
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    // res.send('OK')
    next()
})

// 3
router.use('/:id', (req, res, next) => {
    console.log(`31 url = `, req.originalUrl);
    // next()
    if (req.params.id == 12) {
        console.log('OKK');
        next() // hit callback func yang ada di dalam useCallback
    } else {
        console.log('cek 31 - 1');
        next() // -> function ini akan panggil callback func yang ada di dalam useCallback
    }
}, (req, res, next) => {
    console.log(`32 method = `, req.method);
    // res.send('OOO')
    next()
})

// 4
router.get('/:id', (req, res, next) => {
    console.log(41,'init get');
    if (req.params.id == 12) {
        next('route') // hit final router
    } else {
        console.log(43,' else ');
        next() // -> hit api in useCallback funct
    }
}, (req, res, next) => {
    console.log(44, ' other ');
    res.render('regular') // -> pelajarin res.render()
})

// 5
router.get('/:id', (req, res, next) => {
    console.log('Final route succeed');
    res.send('OK data matched')
})

//2
app.use('/app', router);
app.listen(port, () => console.log('run on port 3000'))