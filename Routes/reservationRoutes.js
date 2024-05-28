const express = require('express');
const router = express.Router();

const Reservation = require('../Models/Reservation'); //Reservation models

//Endpoint to create a reservation
router.post('/', (req, res) => {

    //Create a new Reservation object using the request body
    const reservation  = new Reservation(req.body);

    //Store the Reservation information to the database instace
    reservation.save((err, savedReservation) => {
        if (err){
            res.status(400).json({error: err.message});
        }
        else{
            res.status(200).json({savedReservation});
        }
    })
});

//Endpoint to get all reservations
router.get('/', (req, res) => {
    
    //Fetch all recorded reservations from the DB
    Reservation.getAll((err, allReservations) => {
        if (err){
            res.status(400).json({error: err.message});
        }
        else{
            res.status(200).json({allReservations});
        }
    })
});

//Endpoint to get a single reservation by ID
router.get('/:id', (req, res) => {
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err){
            res.status(400).json({error: err.message});
        }
        else{
            res.status(200).json({reservation});
        }
    })
});

// Endpoint to update a reservation
router.put('/:id', (req, res) => {

    //Find the corresponding reservation
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            //Update the reservation using the request body
            reservation.updateReservationDetails(req.body, (err, updatedReservation) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                } else {
                    res.status(200).json(updatedReservation);
                }
            });
        }
    });
});

module.exports = router;