const express = require('express');

const router = express.Router();

const ReservationController = require('../controllers/reservationController.js');

// Define routes for reservations
router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservationById);
router.post('/', ReservationController.createReservation);
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);

module.exports = router;

