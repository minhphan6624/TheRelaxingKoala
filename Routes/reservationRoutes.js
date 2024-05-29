const express = require('express');
const router = express.Router();

const reservationController = require('../Controllers/reservationController'); //Reservation controller


router.post('/', reservationController.createReservation);//Create a reservation

router.get('/', reservationController.getAllReservations); // Get all reservations
router.get('/:id', reservationController.getReservationByID); // Get a single reservation by ID

router.put('/:id', reservationController.updateReservation); // Endpoint to update a reservation

router.delete('/:id', reservationController.deleteReservation); //Delete a reservation

module.exports = router;