const db = require('../Config/database');

class Reservation {
    constructor(reservationData) {
        this.reservationID = reservationData.reservationID;
        this.name = reservationData.name;
        this.contact = reservationData.contact;
        this.date = reservationData.date;
        this.time = reservationData.time;
        this.num_people = reservationData.num_people;
    }

    //Save the details of a reservation to the DB
    save(callback) {
        const sql = `INSERT INTO Reservations (name, contact, date, time, num_people) 
                     VALUES (?, ?, ?, ?, ?)`;
        const params = [this.name, this.contact, this.date, this.time, this.num_people];
        db.run(sql, params, (result) => {
            if (result && result.lastID) {
                this.reservationID = result.lastID;
                callback(null, this);
            } else {
                callback(new Error('Error saving reservation'));
            }
        });
    }

    //Find a reservation by ID
    static findById(id, callback) {
        const sql = `SELECT * FROM Reservations WHERE id = ?`;
        db.get(sql, [id], (row) => {
            if (row) {
                callback(null, new Reservation(row));
            } else {
                callback(new Error('Reservation not found'));
            }
        });
    }

    //Get all reservation
    static getAll(callback) {
        const sql = `SELECT * FROM Reservations`;
        db.all(sql, [], (rows) => {
            callback(null, rows.map(row => new Reservation(row)));
        });
    }

    //Update reservation details
    updateReservationDetails(details, callback) {
        this.name = details.name || this.name;
        this.contact = details.contact || this.contact;
        this.date = details.date || this.date;
        this.time = details.time || this.time;
        this.num_people = details.num_people || this.num_people;
        this.save(callback);
    }
}

module.exports = Reservation;
