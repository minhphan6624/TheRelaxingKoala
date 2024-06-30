const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orderController.js');

// Define routes for orders
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
