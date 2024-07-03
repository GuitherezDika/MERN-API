// router - level middleware
// https://expressjs.com/en/guide/writing-middleware.html

// const express = require('express');
// const app = express();
// const router = express.Router();
// const port = 3000;

// router.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next()
// })

// router.use('/user/:id', (req, res, next) => {
//     console.log('Request URL: ', req.originalUrl);
//     next()
// }, (req, res, next) => {
//     console.log('Request Type: ', req.method);
//     next()
// });

// router.get('/user/:id', (req, res, next) => {
//     if (req.params.id === 0) next('route')
//     else next()
// }, (req, res, next) => {
//     res.render("regular")
// })

// router.get('/user/:id', (req, res, next) => {
//     console.log(req.params.id);
//     res.render('special')
// })

// app.use('/', router)

// app.listen(port, () => {
//     console.log('run on port 3000');
// })

const express = require('express');
const app = express();
const port = 3000;

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next()
}
app.use(requestTime)

app.get('/', (req, res) => {
    let responseText = "Hello World!<br>"
    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
})

app.listen(port, () => console.log('run on port = 3000'));

// https://expressjs.com/en/guide/using-middleware.html
