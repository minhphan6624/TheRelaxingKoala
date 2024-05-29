const express = require('express');
const router = express.Router();

const orderController = require('../Controllers/orderController'); //Order controller


router.post('/', orderController.createOrder);//Create an order

router.get('/', orderController.getAllOrders); // Get all orders
router.get('/:id', orderController.getOrderByID); // Get a single order by ID

router.put('/:id', orderController.updateOrder); // Endpoint to update a reservation

router.delete('/:id', orderController.deleteOrder); //Delete a reservation

module.exports = router;