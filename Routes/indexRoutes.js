const express = require('express');
const router = express.Router();

//Home page route
router.get('/', (req, res) => {
    res.render('index');
});

//Menu route
router.get('/menu', (req, res) => {
    res.render('menu')
})

router.get('/reservation', (req, res) => {
    res.render('createReservation')
})

router.get('/order', (req, res) => {
    res.render('createOrder')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router;
