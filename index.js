const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./config');
const multer = require('multer');

const app = express();

connectToDatabase();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null, // null = success
            'images'// direktori simpan file pada server
        )
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // 1E9 = 1 miliar => 0.12345 * 1 miliar = 123450000
        cb(null, file.originalname + '-' + uniqueSuffix)
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fieldNameSize: 100, // 100 karakter
        fileSize: 1024 * 1024 * 5, // 5 Mb
        files: 4, // jumlah file upload = 4
        fields: 4, // jumlah field ikutaan maksimal 4 (misal name, email, phone, color)
        parts: 5, // form data multipart yang di upload harus kurang dari 5 form
        headerPairs: 4, // max number of header key -> jumlah pasangan header yang diterima dari permintaan HTTP saat mengunggah file menggunakan form-data multipart
    }
})


app.use(upload.single('image'))
// CARA 1 - parsed data dengan third party
app.use(bodyParser.json())

// set header - prevent CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*") // * bisa di akses oleh semua URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// harus terakhir sebelum action listen
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 400;
    const errMessage = err.message || 'invalid';
    const data = err.data || [];

    res.status(errorStatus).json({
        message: errMessage,
        data
    })
})

app.listen(3000, () => {
    console.log('server run on port 3000');
})
