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

    const createOrderTable = `
          CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            order_date TEXT NOT NULL,
            status TEXT NOT NULL,
            order_type TEXT NOT NULL,
            table_id INTEGER,
            delivery_address TEXT,
            FOREIGN KEY (table_id) REFERENCES Tables(id)
            )`;
    
    const createOrderItemTable = `
            CREATE TABLE IF NOT EXISTS OrderItems (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              order_id INTEGER NOT NULL,
              menu_item_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL,
              price REAL NOT NULL,
              notes TEXT,
              FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
              FOREIGN KEY (menu_item_id) REFERENCES MenuItems(id)
            )`;
    const createMenuItemTable = `
            CREATE TABLE IF NOT EXISTS MenuItems (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              description TEXT,
              price REAL NOT NULL,
              category TEXT NOT NULL
            )`;
    const createTableTable = `
            CREATE TABLE IF NOT EXISTS Tables (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              number INTEGER NOT NULL,
              capacity INTEGER NOT NULL,
              status TEXT NOT NULL
            )`;
      
    const createPaymentTable = `
            CREATE TABLE IF NOT EXISTS Payments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              order_id INTEGER NOT NULL,
              payment_method TEXT NOT NULL,
              amount REAL NOT NULL,
              payment_date TEXT NOT NULL,
              FOREIGN KEY (order_id) REFERENCES Orders(id)
            )`;
    
    // const createUserTable = `
    //     CREATE TABLE IF NOT EXISTS Users (
    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
    //       username TEXT,
    //       password TEXT,
    //       role TEXT
    //     )`;

    this.db.run(createReservationTable);
    this.db.run(createOrderTable);
    this.db.run(createOrderItemTable);
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
