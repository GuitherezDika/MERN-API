const express = require('express');
const cors = require('cors')
const app = express();

// parse data url-encoded
app.use(cors());

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})
app.get('/data', (req, res) => {
    res.json({ message: `About page` })
})
/*
postman
{
    "message": "About page"
}
*/

app.listen(3000, () => {
    console.log('server run on port 3000');
})
