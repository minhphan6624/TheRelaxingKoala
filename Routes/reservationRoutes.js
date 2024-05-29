const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const Reservation = require('../Models/Reservation'); //Reservation model

//Validation rules
const reservationValidationRules = [
    body('name').isString().withMessage('Name must be a string'),
    body('contact').isString().withMessage('Contact must be a string'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('time').isString().withMessage('Time must be a string'),
    body('num_people').isInt({ gt: 0 }).withMessage('Number of people must be greater than 0'),
    body('requests').optional().isString().withMessage('Requests must be a string')
];

// ---------------------CREATE operations---------------------

//Create a reservation
router.post('/', (req, res) => {

    // //Check for any errors during validation 
    // const errors = validationResult(req);

    // //If there's validation errors
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() }); //return the list of errors
    // }

    //Create a new Reservation object using the request body
    const reservation = new Reservation(req.body);

    //Store the Reservation information to the database instace
    reservation.save((err, savedReservationID) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        
        return res.status(201).json(savedReservationID);
    })
});

// ---------------------READ Operations---------------------

// Get all reservations
router.get('/', (req, res) => {

    //Fetch all recorded reservations from the DB
    Reservation.getAll((err, reservations) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(200).json(reservations);
        
    })
});

// Get a single reservation by ID
router.get('/:id', (req, res) => {
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found!' });
        }
        
        return res.status(200).json(reservation );
        
    })
});

//---------------------UPDATE Operations---------------------

// Endpoint to update a reservation
router.put('/:id', (req, res) => {

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     res.status(400).json({ errors: errors.array() });
    // }

    //Find the corresponding reservation
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err) {
            return res.status(500).json({ error: err.message }); //Server error
        }
        // If there is no matching reservation to be found
        else if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" }); //Return a 404 error
        }
        
        //Update the reservation using the request body
        reservation.updateReservationDetails(req.body, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message }); //Server error
            } 
            
            return res.status(200).json({message: 'Reservation updated'});
            
        });
        
    });
});

//---------------------DELETE Operations---------------------
router.delete('/:id', (req, res) => {
    Reservation.delete(req.params.id, (err, result) => {
        if (err){
            return res.status(500).json({err: err.message})
        }

        return res.status(200).json(result);
    })
});

module.exports = router;