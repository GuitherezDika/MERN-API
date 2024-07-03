const express = require('express');
const app = express();
const router = express.Router();

// Middleware pada level router
const loggerMiddleware = (req, res, next) => {
  // console.log('logger middleware = ');
  console.log(`1 Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  const token2 = true;
  // if (token === 'valid-token') {
  if (token2) {
    console.log('2 auth middleware = ');
    next();
  } else {
    console.log(2);
    res.status(401).send('Unauthorized');
  }
};

// Menggunakan middleware pada router
router.use(loggerMiddleware);
router.use(authMiddleware);

// Definisikan rute
router.get('/secure-data', ( req, res) => {
  res.send('This is secure data.');
});

router.get('/public-data', (req, res) => {
  res.send('This is public data.');
});

// Tambahkan router ke aplikasi utama
// app.use -> API AWALAN UTAMA 
// API AWALAN = http://localhost:3000/api
app.use('/api', router); // api awalan + router
{/*
  http://localhost:3000/api
  -> router.use(loggerMiddleware)
  -> passed -> next()
  -> router.use(authMiddleware)
  -> passed -> tapi retun 404 not found karena belum ada return "res.send"

  API AWALAN + ROUTER
  http://localhost:3000/api/secure-data
  -> postman = "This is secure data"
  http://localhost:3000/api/public-data
  -> postman = "This is public data"
  */}

// Jalankan server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});