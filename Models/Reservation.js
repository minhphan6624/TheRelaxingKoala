const db = require('../Config/database');

class Reservation {
    constructor(reservationData) {
        this.reservationID = reservationData.reservationID;
        this.name = reservationData.name;
        this.contact = reservationData.contact;
        this.date = reservationData.date;
        this.time = reservationData.time;
        this.num_people = reservationData.num_people;
        this.requests = reservationData.requests || '';
    }

    // Save/insert the details of a reservation to the DB
    save(callback) {
        const sql = `INSERT INTO Reservations (name, contact, date, time, num_people, requests) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [this.name, this.contact, this.date, this.time, this.num_people];

        db.run(sql, params, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { id: this.lastID });
            }
        });
    }

    //Find a reservation by ID
    static findById(id, callback) {
        const sql = `SELECT * FROM Reservations WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                callback(err);
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
                callback(err);
            } else {
                callback(null, rows.map(row => new Reservation(row)));
            }
        });
    }

    //Update reservation details
    updateReservationDetails(details, callback) {
        this.name = details.name || this.name;
        this.contact = details.contact || this.contact;
        this.date = details.date || this.date;
        this.time = details.time || this.time;
        this.num_people = details.num_people || this.num_people;

        //Update the info of the Reservation

        const sql = `UPDATE Reservations SET name = ?, contact = ?, date = ?, time = ?, num_people = ?, requests = ? WHERE id = ?`;

        const params = [this.name, this.contact, this.date, this.time, this.num_people, this.requests, this.id];

        db.run(sql, params, (err) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null);
            }
        })
    }
}

module.exports = Reservation;
