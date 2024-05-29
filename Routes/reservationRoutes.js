const express = require('express');
const router = express.Router();

const reservationController = require('../Controllers/reservationController'); //Reservation controller

//Create a reservation
router.post('/', reservationController.createReservation);

// Get all reservations
router.get('/', reservationController.getAllReservations);

// Get a single reservation by ID
router.get('/:id', reservationController.getReservationByID);

// Endpoint to update a reservation
router.put('/:id', reservationController.updateReservation);

//Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;