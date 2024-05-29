const Reservation = require('../Models/Reservation');

// ---------------------CREATE operations---------------------
exports.createReservation = (req, res) => {
    //Create a new Reservation object using the request body
    const reservation = new Reservation(req.body);

    //Store the Reservation information to the database instace
    reservation.save((err, savedReservationID) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        
        return res.status(201).json(savedReservationID);
    })
}

// ---------------------READ Operations---------------------
exports.getAllReservations = (req, res) => {

    //Fetch all recorded reservations from the DB
    Reservation.getAll((err, reservations) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(200).json(reservations);
        
    })
}

exports.getReservationByID = (req, res) => {
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found!' });
        }
        
        return res.status(200).json(reservation );
        
    })
}

//---------------------UPDATE Operations---------------------
exports.updateReservation = (req, res) => {

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
}

//---------------------DELETE Operations---------------------
exports.deleteReservation = (req, res) => {
    Reservation.delete(req.params.id, (err, result) => {
        if (err){
            return res.status(500).json({err: err.message})
        }

        return res.status(200).json(result);
    })
}