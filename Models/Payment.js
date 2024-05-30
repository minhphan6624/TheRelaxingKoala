const db = require('../database');

class Payment {
  constructor(paymentData) {
    this.id = paymentData.id;
    this.orderID = paymentData.orderID;
    this.amount = paymentData.amount;
    this.method = paymentData.method;
    this.date = paymentData.date || new Date().toISOString();
  }

  //Insert a new payment to the DB
  save(callback) {
    const sql = `INSERT INTO Payments (amount, method, date) VALUES (?, ?, ?, ?)`;
    
    const params = [this.amount, this.method, this.date];

    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Find a payment by ID
  static findById(id, callback) {
    const sql = `SELECT * FROM Payments WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err);
      } else if (!row) {
        callback(new Error('Payment not found'));
      } else {
        callback(null, new Payment(row));
      }
    });
  }

  //Get all payments
  static getAll(callback) {
    const sql = `SELECT * FROM Payments`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new Payment(row)));
      }
    });
  }
}

module.exports = Payment;
