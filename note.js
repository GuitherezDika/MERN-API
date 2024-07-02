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

    = terminal = git commit -m 'first initialize'
    */
}