exports.createBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    const created_at = req.body.created_at;
    const name = req.body.name;

    const blogData = {
        title,
        image,
        body,
        created_at,
        "author": {
            "uid": 1,
            name
        }
    }
    res.status(201).json(blogData)
}