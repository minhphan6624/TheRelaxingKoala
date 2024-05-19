const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// Route to display the order form
router.get('/orders/new', orderController.createOrderForm);

// Route to handle order form submission
router.post('/orders', orderController.createOrder);

module.exports = router;
