const express = require('express');
const app = express();

// parse data url-encoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name">
            <button type="submit">Submit</button>
        </form>
    `)
})
// - isi data input -> submit

app.post('/submit', (req, res) => {
    const name = req.body.name;
    res.send(`Hello ${name}`)
})
app.listen(3000, () => {
    console.log('server run on port 3000');
})

// dummy => postman -> {"book":[{"id":1,"title":"cook"},{"id":2,"title":"chef"}]}
// express.json -> res.send(req.body) -> {}