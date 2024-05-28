const express = require('express');
const router = express.Router();

const Order = require('../Models/Order');

// Route to display the order form
router.get('/new', orderController.createOrderForm);

// Route to handle order form submission
router.post('/', orderController.createOrder);

module.exports = router;
