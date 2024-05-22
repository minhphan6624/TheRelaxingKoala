const express = require('express');
const path = require('path');  // Required for resolving paths
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

// Serve the homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views', 'homepage.html'));
});

// User routes
router.post('/users', userController.createUser);

// Order routes
router.post('/orders', orderController.createOrder);

// Add more routes as needed

module.exports = router;
