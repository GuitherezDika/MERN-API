const express = require('express')
const app = express()
const port = 3000

// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    res.send('Hello World! mern')
})
app.post('/', (req, res) => {
    res.send('Got a POST request')
})
app.route('/user')
    .put( (req, res) => {
    res.send('Got a PUT request at /user route')
    })
    .delete((req, res) => {
    res.send('Got a DELETE request at /user route')
})

// route path = acd or abcd = userId?user
app.get('/userId?_id', (req, res) => {
    // -> http://localhost:3000/userId_id OK
    // -> http://localhost:3000/userI_id OK
    // -> http://localhost:3000/userId = wrong

    res.send('userId?_id')
})
app.get('/user+id', (req, res) => {
    // -> http://localhost:3000/userrrrid OK
    // -> http://localhost:3000/userid OK

    res.send('user+id')
})
app.get('/user*id', (req, res) => {
    // -> http://localhost:3000/userid OK
    // -> http://localhost:3000/user12id OK
    // -> http://localhost:3000/userABCid ok
    // -> http://localhost:3000/userABC34id

    res.send('user*id')
})

app.get('/user(id)?name', (req, res) => {
    // http://localhost:3000/useridname
    // http://localhost:3000/username

    res.send('user(id)?name')
})

app.get('/user/', (req, res) => {
    // http://localhost:3000/user
    // http://localhost:3000/user/

    res.send('/user/')
})

app.get(/user/, (req, res) => {
    // http://localhost:3000/user//
    // http://localhost:3000/user//A
    // http://localhost:3000/user/X
    // http://localhost:3000/IDuser/X
    // http://localhost:3000/IDuserX
    res.send('/user2/')
})

app.get(/.*fly$/, (req, res) => {
    // http://localhost:3000/fly
    // http://localhost:3000/abcfly
    // http://localhost:3000/BCEfly
    // http://localhost:3000/flyAC = NO
    // http://localhost:3000/AflyAC = NO
    // http://localhost:3000/aflyac = NO

    res.send('/.*fly$/')
})

// ROUTE PARAMETERS
app.post('/user/:userId/name/:username', (req, res) => {
    res.send('success input name')
})

app.post('/user/flights/:from-:to', (req, res) => {
    // Postman -> Path Variables
    // Key = from-:to
    // value = CGK-KNO
    res.send('succes post flights departure')
})

app.post('/user/plantae/:genus&:species', (req, res) => {
    res.send('success add plants data')
})

const middleware1 = (req, res, next) => {
    console.log('middleware 1');
    next()
}

const middleware2 = (req, res, next) => {
    console.log('middleware 2');
    next()
}

app.get('/callback/a', [middleware1, middleware2], (req, res, next) => {
    console.log('Final route handler');
    res.send('Hello from A!!')
    next()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log('run on you')
})