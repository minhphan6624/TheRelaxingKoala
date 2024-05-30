const db = require('../database');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
    this.password = userData.password; // Use hashing for passwords
    this.role = userData.role; // 'staff' or 'manager'
  }

  //Add a new user to the db
  save(callback) {
    const sql = `INSERT INTO Users (username, password, role) VALUES (?, ?, ?)`;

    const params = [this.username, this.password, this.role];

    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Find a user by Username
  static findByUsername(username, callback) {
    const sql = `SELECT * FROM Users WHERE username = ?`;

    db.get(sql, [username], (err, row) => {
      if (err) {
        callback(err);
      } else {
        callback(null, new User(row));
      }
    });
  }

  //Find a user by ID
  static findById(id, callback) {
    const sql = `SELECT * FROM Users WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err);
      } else {
        callback(null, new User(row));
      }
    });
  }
}

module.exports = User;