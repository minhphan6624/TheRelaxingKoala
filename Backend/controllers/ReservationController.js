const Reservation = require("../models/Reservation");

// @desc Get all reservations
// @route GET /api/reservations
// @access Public
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Failed to fetch reservations', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a reservation by ID
// @route GET /api/reservations/:id
// @access Public
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
        res.json(reservation);
        } else {
        res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create a new reservation
// @route POST /api/reservations
// @access Public
exports.createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update a reservation
// @route PUT /api/reservations/:id
// @access Public
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            reservation.update(req.body);
            res.json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Delete a reservation
// @route DELETE /api/reservations/:id
// @access Public
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            reservation.destroy();
            res.json({ message: "Reservation deleted" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
