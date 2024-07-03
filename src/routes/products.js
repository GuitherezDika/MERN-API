const express = require('express')
const router = express.Router()

const productController = require('../controller/products')
const { createProduct, getAllProducts } = productController;

// PATH + CONTROLLER/helper
router.post('/product', createProduct)
router.get('/product', getAllProducts)

module.exports = router;