{
    /*
    1. create package.json
    npm init = initializer project
    package name: mern-api
    version = 1.0.0
    description = RESTful API
    entry point = index.js
    test command
    git repository
    keywords
    author = mahardika-sinaga
    license(ISC)

    2. CREATE SERVER = NodeJS + Express
    https://expressjs.com/en/starter/installing.html
    npm install express --save

    index.js
    set port and listener
    terminal = node index.js
    -> website = localhost:3000

    3. RUN SERVER AUTOMATICALLY = install nodemon
    = tool that helps develop node.js application by automatically restarting the node application when file changes in the directory are detected
    = npm install -g nodemon 
    = nodemon index.js
    = package.json -> scripts: {"start": "nodemon index.js"}
    -> terminal => npm start

    4. CREATE REPOSITORY
    https://github.com/GuitherezDika?tab=repositories
    = Create New Repository
    = repository name = 'MERN-API'
    = Public
    = Create a Repository
    = Cek Project
    = git status
        index.js
        node_modules/ // DATA BESAR HARUS IGNORED
        note.js
        package-lock.json
        package.json
    => fatal: not a git repository 
    = create a new git from command line
    = terminal = git init
    = Initialized empty Git repository in C:/Users/62240512/Documents/website/REACT_JS/prawito hudoro/mern-api/.git/

    = tambah file ".GITIGNORE"
    = file tidak masuk ke repository
    = terminal = git status
        .gitignore
        index.js
        note.js
        package-lock.json == detail dari versi package termasuk detail sub package instalasi
        package.json == data versi package instalasi
    = semua ini wajib di simpan di repository

    = git add .
    = terminal = git commit -m 'first initialize'
    = git branch -m "main"
    = git branch => main
    = git remote add origin https://github.com/GuitherezDika/MERN-API.git
    = git push origin main

    5. BASIC ROUTING
    https://expressjs.com/en/starter/basic-routing.html
    = ROUTING mengacu pada penentuan bagaimana applikasi meresponds terhadap request client terhadap endpoint tertentu, yaitu URI (path) dan metode permintaan tertentu HTTP
    = structure: 
        app.METHOD(PATH, HANDLER)
    = app: instance of express
    = METHOD: an HTTP request method in lowercase
    = PATH: a path on the server
    = HANDLER: is the function executed when the route is matched

    ROUTE PARAMETERS
    capture the values specified at their position in the URL
    the captured values are populated in the req.params object

    Route path: /users/:userId/books/:bookId
    Request URL : http://localhost:3000/users/34/books/8989
    req.params : {"userId": "34", "bookId": "8989"}

    interpret hyphen (-) & and (&)
    Route.path: /flights/:from-:to
    Request URL: http://localhost:3000/flights/LAX-SFO
    req.params: {"from": "LAX", "to": "SFO"}

    Route path: /plantae/:genus.:species
    Request URL: http://localhost:3000/plantae/Prunus&persica
    req.params: {"genus":"Prunus", "species": "persica"}

    dalam POSTMAN
    untuk Parameters 
        ->table Query Params 
        http://localhost:3000/user/?id=12&username=dika
        key = id: 12
            username: dika

        ->table Params Path Variables
        http://localhost:3000/user/:id/name/:username
        path variables: 
        key = id : 12
            = username : dika

    ROUTE HANDLERS
    = multiple callback functions 
    = behave like middleware to handle a request
    = single callback function to handle a route
    = more than one callback function
    
    const middleware1 = (req, res, next) => {
        console.log('middleware 1');
        next()
    }

    const middleware2 = (req, res, next) => {
        console.log('middleware 2');
        next()
    }

    app.get('/callback/a', middleware1, middleware2, (req, res, next) => {
        res.send('Hello from A!')
        next()
    })

    or
    app.get('/callback/a', [middleware1, middleware2], (req, res, next) => {
        console.log('Final route handler');
        res.send('Hello from A!!')
        next()
    })

    bentuk simplifikasi BASIC ROUTING
    app.route('/user')
        .put( (req, res) => {
        res.send('Got a PUT request at /user route')
        })
        .delete((req, res) => {
        res.send('Got a DELETE request at /user route')
    })

    ========================================================

    // BASIC ROUTING
    app.get('/', (req, res) => {
        res.send('Hello World')
    })

    // handle all methods
    app.all()

    // to specify midlleware as the callback functions
    app.use()

    express.Router
    is a class to create modular, mountable route handlers
    router = a module
    run a middleware functions

    const express = require('express');
    const app = express.Router()

    TEORI
    Express Application can use the following types of middleware:
    1. application-level middleware = for entire application not specific route
    2. router-level middleware
    3. error-handling middleware
    4. built-in middleware
    5. third-party middleware

    1. application-level middleware

    to bind application-level middleware menggunakan 
        -> app.use()
        -> app.METHOD() ; get/post/put/patch/delete ....

    mount path = ('/user/:id', (req, res) => {})
    unmount path = ((req, res) => {})

    index1.js - index7.js
    = middleware level

    index8.js - 
    = built in middleware from express
    
    client post data
    memerlukan middleware saat klient kirim data ke server HTTP POST

    app.use(express.json())
    = middleware "urlencoded" -> parsing form data client (Optional)

    pada postman kirim data
    body / x-www-form-urlencoded
    key id = 3
    key name = 'book'
    key price = 2000

    return api req.body = 
    [Object: null prototype] { id: '3', name: "'book'", price: '2000' }

    bila pengiriman data Postman
    Body - raw -> json
    {
        "id": 2,
        "name": "pen",
        "price": 100
    }
    
    response API req.body = { id: 2, name: 'pen', price: 100 }

    // CARA 1 -> di set agar router bisa akses client data
    // app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))

    // CARA 2 - parsed data dengan third party
    // postman -> HANYA BISA body - raw - json
    app.use(bodyParser.json())

    validasi API - error handling
    EXPRESS - VALIDATOR
    = middleware express.js
    = wrap collection api tuk validasi dan bersih oleh validator

    npm install express-validator
    done

    INSTALL MONGODB - LOKAL
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#std-label-install-mdb-community-windows
    MongoDB Download Center -> https://www.mongodb.com/try/download/community
        Pilih -> MongoDB Community Server 
        -> Download >500mb Version 7.0.12
        DONE

    Connect Project into MongoDB
    https://www.w3schools.com/nodejs/nodejs_mongodb.asp
    https://www.mongodb.com/resources/languages/mongodb-with-nodejs

    NPM + mongoose
    npm install mongoose

    database name = mern-db
    collection name = mern-db-reg
    connection uri = mongodb://localhost:27017/
    dari "copy connection string"

    https://medium.com/how-to-react/setup-mern-mongodb-express-js-react-js-and-node-js-environment-and-create-your-first-mern-7774df0fff19
    
    pada direktori models
    const User = mongoose.model('users', userSchema); 
    ------> 'users' = nama collection pada database
    module.exports = User;
    OK
    
    */
}