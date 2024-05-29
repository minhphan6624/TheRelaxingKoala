const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    if (!Database.instance) {
      this.db = new sqlite3.Database('database.sqlite', (err) => {
        if (err) {
          console.error('Could not connect to database', err);
        } else {
          console.log('Connected to database');
          this.initialize();
        }
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  initialize() {
    const userTable = `
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT,
                role TEXT
            )`;
    const reservationTable = `
            CREATE TABLE IF NOT EXISTS Reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                contact TEXT,
                date TEXT,
                time TEXT,
                num_people INTEGER,
                requests TEXT
            )`;
    const orderTable = `
            CREATE TABLE IF NOT EXISTS Orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                orderDateTime TEXT,
                totalAmount REAL,
                status TEXT,
                specialInstructions TEXT,
                paymentStatus TEXT,
                customerId INTEGER,
                tableId INTEGER,
                fohStaffId INTEGER,
                orderItems TEXT
            )`;
    const menuTable = `
            CREATE TABLE IF NOT EXISTS MenuItems (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                price REAL,
                category TEXT
            )`;

    this.db.run(userTable);
    this.db.run(reservationTable);
    this.db.run(orderTable);
  }

  run(sql, params = [], callback = () => { }) {
    this.db.run(sql, params, function (err) {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(this); // Provides context such as `lastID`
      }
    });
  }

  all(sql, params = [], callback = (rows) => { }) {
    this.db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(rows); // Returns an array of rows
      }
    });
  }

  get(sql, params = [], callback = (row) => { }) {
    this.db.get(sql, params, (err, row) => {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(row); // Returns a single row
      }
    });
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
