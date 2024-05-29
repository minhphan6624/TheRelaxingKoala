const express = require('express');
const router = express.Router();

const Reservation = require('../Models/Reservation'); // Reservation model

//Home page route
router.get('/', (req, res) => {
    res.render('index');
});

//Menu route
router.get('/menu', (req, res) => {
    res.render('menu')
})

router.get('/reservation', (req, res) => {
    Reservation.getAll((err, reservations) => {
        if (err) {
            return res.status(500).send('Error retrieving reservations');
        }
        res.render('reservation', { reservations });
    });
})

router.get('/order', (req, res) => {
    res.render('order')
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;
