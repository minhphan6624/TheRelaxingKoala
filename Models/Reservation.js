const db = require('../database');

class Reservation {
    constructor(reservationData) {
        this.id = reservationData.id;
        this.name = reservationData.name;
        this.contact = reservationData.contact;
        this.date = reservationData.date;
        this.time = reservationData.time;
        this.num_people = reservationData.num_people;
        this.requests = reservationData.requests || '';
    }

// ---------------------CREATE Operations Methods---------------------

    // Save/insert the details of a reservation to the DB
    save(callback) {

        const sql = `INSERT INTO Reservations (name, contact, date, time, num_people, requests) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

        const params = [this.name, this.contact, this.date, this.time, this.num_people, this.requests];

        db.run(sql, params, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result.lastID); //Return the ID of the last inserted row
            }
        });
    }

// ---------------------READ Operations Methods---------------------
    //Find a reservation by ID
    static findById(id, callback) {
        
        const sql = `SELECT * FROM Reservations WHERE id = ?`;

        const params = [id]

        db.get(sql, params, (err, row) => {
            if (err) {
                callback(new Error('Reservation not found'));
            } else {
                callback(null, new Reservation(row));
            }
        });
    }

    // Return a list of all reservations
    static getAll(callback) {

        const sql = `SELECT * FROM Reservations`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows.map(row => new Reservation(row)));
            }
        });
    }

// ---------------------Update Operations Methods---------------------
    //Update reservation details
    updateReservationDetails(details, callback) {
        this.name = details.name || this.name;
        this.contact = details.contact || this.contact;
        this.date = details.date || this.date;
        this.time = details.time || this.time;
        this.num_people = details.num_people || this.num_people;
        this.requests = details.requests || this.requests;
        //Update the info of the Reservation

        const sql = `UPDATE Reservations SET name = ?, contact = ?, date = ?, time = ?, num_people = ?, requests = ? WHERE id = ?`;
        
        const params = [this.name, this.contact, this.date, this.time, this.num_people, this.requests, this.id];

        db.run(sql, params, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

// ---------------------DELETE Operations Methods---------------------
    //Delete a reservation based on ID
    static delete(id, callback) {
        const sql = `DELETE FROM Reservations WHERE id = ?`;
        db.run(sql, [id], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, { message: 'Reservation deleted successfully'});
            }
        });
    }

}

module.exports = Reservation;
