const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

// Define routes here
router.post('/users', userController.createUser);
router.post('/orders', orderController.createOrder);

// Add more routes as needed

module.exports = router;
