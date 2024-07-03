const express = require('express');
const app = express();

// parse data url-encoded
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Static Files</title>
            <link rel="stylesheet" type="text/css" href="/myapp/public/css/styles.css">
        </head>
        <body>
            <h1>Hello, World!<h1>
            <img src={"/myapp/public/images/logo.jpg"} />
            <script src="/myapp/public/js/script.js"></script>
        </body>
        </html>
    `)
})

app.listen(3000, () => {
    console.log('server run on port 3000');
})
