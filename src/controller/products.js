exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message: 'Success create product',
        data: {
            id: 1,
            name,
            price
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