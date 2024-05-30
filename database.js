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
    const createReservationTable = `
            CREATE TABLE IF NOT EXISTS Reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                contact TEXT,
                date TEXT,
                time TEXT,
                num_people INTEGER,
                requests TEXT
            )`;

    const createUserTable = `
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          password TEXT,
          role TEXT
        )`;

    const orderTable = `
            CREATE TABLE IF NOT EXISTS Orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                orderDateTime TEXT,
                status TEXT,
                date TEXT,
                time TEXT,
                num_people INTEGER,
                requests TEXT
            )`;


    this.db.run(createReservationTable);
  }

  run(sql, params = [], callback = () => { }) {
    this.db.run(sql, params, function (err) {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(null, this); // Provides context: `lastID` and `changes`
      }
    });
  }

  all(sql, params = [], callback = (rows) => { }) {
    this.db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(null, rows); // Returns an array of rows
      }
    });
  }

  get(sql, params = [], callback = (row) => { }) {
    this.db.get(sql, params, (err, row) => {
      if (err) {
        console.error('Error running sql', err);
      } else {
        callback(null, row); // Returns a single row
      }
    });
  }
}

const db = new Database();
Object.freeze(db);

module.exports = db;
