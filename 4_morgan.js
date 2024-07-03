const express = require('express');
const morgan = require('morgan')
const app = express();

// parse data url-encoded
app.use(morgan('tiny')); 

/*
combined
::1 - - [03/Jul/2024:22:01:14 +0000] "GET /about HTTP/1.1" 304 - "-" 
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

tiny
GET / 304 - - 4.349 ms
*/
app.get('/', (req, res) => {
    res.send(`Hello World!`)
})
app.get('/about', (req, res) => {
    res.send(`About page`)
})

app.listen(3000, () => {
    console.log('server run on port 3000');
})
