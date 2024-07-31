const express = require('express');
const router = express.Router();

const ReservationController = require('../controllers/reservationController.js');
const reservationValidator = require('../middlewares/ReservationValidator.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');

// Define routes for reservations
router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservationById);
router.post('/', reservationValidator, ReservationController.createReservation);
router.put('/:id', reservationValidator, ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);

module.exports = router;

