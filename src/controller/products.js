exports.createProduct = (req, res, next) => {
    res.json({
        message: 'Success create product',
        data: {
            id: 1,
            name: 'book',
            price: 100
        }
    })
    next()
}

exports.getAllProducts = (req, res, next) => {
    res.json({
        message: 'Get All Product Success',
        data: [
            {
                id: 1,
                name: 'book',
                price: 100
            }
        ]
    })
    next()
}