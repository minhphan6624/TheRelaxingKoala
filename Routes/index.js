const express = require('express');
const router = express.Router();

//Route to display test index route
router.get('/', (req, res) => {
    const title = "Hellu";
    const message = "Welcome to the relaxing koala!"
    res.render('index', {title, message});
})

module.exports = router;
