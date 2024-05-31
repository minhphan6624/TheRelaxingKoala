const express = require('express');
const router = express.Router();

const paymentController = require('../Controllers/paymentController');

//Route to create a payment
router.post('/', paymentController.createPayment);

//Route to get a payment by ID
router.get('/:id', paymentController.getPaymentByID);

