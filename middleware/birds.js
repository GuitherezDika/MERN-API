const express = require('express');
const router = express.Router();

// middleware timelog
const timelog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next()
}

router.use(timelog)