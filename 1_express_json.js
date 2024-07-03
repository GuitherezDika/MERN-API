const express = require('express');
const app = express();
const dummy = {
    book: [
        { id: 1, title: 'cook' },
        { id: 2, title: 'chef1' }
    ]
};
app.use(express.json());

app.post('/data', (req, res) => {
    // res.send(dummy) // cara 1
    
    // cara 2
    const receivedData = req.body;
    const responseData = {...dummy, ...receivedData};

    res.send(responseData)
    /*
    {
        "book": [
            {
                "id": 1,
                "title": "cook"
            },
            {
                "id": 2,
                "title": "chef1"
            }
        ]
    }
    */
})
app.listen(3000, () => {
    console.log('server run on port 3000');
})

// dummy => postman -> {"book":[{"id":1,"title":"cook"},{"id":2,"title":"chef"}]}
// express.json -> res.send(req.body) -> {}