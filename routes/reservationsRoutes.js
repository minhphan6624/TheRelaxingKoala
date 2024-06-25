const express = require('express');

const router = express.Router();

//Mock data
let reservations = [
    {id : 1, name: "John Doe", date : "2024-06-25", time: "19:00", guestNum: 4, contact: "1234567890"},
    {id : 2, name: "Jane Doe", date : "2024-06-25", time: "19:00", guestNum: 4, contact: "1234567890"},
    {id : 3, name: "John Smith", date : "2024-06-25", time: "19:00", guestNum: 4, contact: "1234567890"},
];


//GET all reservations
router.get('/', (req, res) => {
    res.json(reservations);
});

//GET a reservation by ID
router.get('/:id', (req, res) => {
    res.json(reservations.find(reservation => reservation.id === parseInt(req.params.id)));
});

//POST a new reservation
router.post('/', (req, res) => {
    
    //Create a new reservation using the request body
    const reservation = {
        id: reservations.length + 1,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        guestNum: req.body.guestNum,
        contact: req.body.contact
    };

    //Add the new reservation to the reservations array
    reservations.push(reservation);

    //Return the new reservation
    res.status(201).json(reservation);
});


//PUT to update a reservation
router.put('/:id', (req, res) => {
    //Find the reservation by ID
    const {id} = req.params;
    const index = reservations.findIndex(r => r.id === parseInt(id)); 

    //Create a new reservation using the request body
    const updatedReservation = req.body;

    if (index !== -1){
        reservations[index] = {id : parseInt(id), ...updatedReservation};
        res.json(reservations[index])
    }
    else
    {
        res.status(404).json({message: `Reservation with ID ${id} not found`});
    }
});

//DELETE a reservation
router.delete('/:id', (req, res) => {
    //Find the reservation by ID
    const {id} = req.params;
    const index = reservations.findIndex(r => r.id === parseInt(id));

    if (index !== -1){
        const deletedReservation = reservations.splice(index, 1);
        res.json(deletedReservation); //Return the deleted reservation 
    }
    else
    {
        res.status(404).json({message: `Reservation with ID ${id} not found`});
    }
    
});

module.exports = router

