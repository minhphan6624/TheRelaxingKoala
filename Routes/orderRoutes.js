const express = require('express');
const router = express.Router();

const orderController = require('../Controllers/orderController'); //Order controller

// ------------ Order Routes ------------
router.post('/', orderController.createOrder);//Create an order

router.get('/', orderController.getAllOrders); // Get all orders
router.get('/:id', orderController.getOrderByID); // Get a single order by ID
router.get('/:id/getOrderWithItems', orderController.getOrderWithItems); // Route to get an order by ID with items

router.put('/:id', orderController.updateOrder); // Endpoint to update a reservation

router.delete('/:id', orderController.deleteOrder); //Delete a reservation

// ------------ OrderItem Routes ------------

// Route to add an item to an order
router.post('/:orderId/addOrderItem', orderController.addOrderItem);

// Route to remove an item from an order
router.delete('/removeOrderItem/:itemId', orderController.removeOrderItem);

module.exports = router;