const express = require('express');
const app = express();
const productRoutes = require('./src/routes/products');

app.use('/', productRoutes);

app.listen(3000, () => {
    console.log('server run on port 3000');
})
