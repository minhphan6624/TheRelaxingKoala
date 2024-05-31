const db = require('../database');

class MenuItem {
  constructor(menuItemData) {
    this.id = menuItemData.id;
    this.name = menuItemData.name;
    this.description = menuItemData.description;
    this.price = menuItemData.price;
    this.category = menuItemData.category;
  }

  //Insert a new menuItem
  save(callback) {
    const sql = `INSERT INTO MenuItems (name, description, price, category) VALUES (?, ?, ?, ?)`;
    
    const params = [this.name, this.description, this.price, this.category];

    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Find a MenuItem by ID
  static findById(id, callback) {
    const sql = `SELECT * FROM MenuItems WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err);
      } else if (!row) {
        callback(new Error('MenuItem not found'));
      } else {
        callback(null, new MenuItem(row));
      }
    });
  }

  //Get all MenuItems
  static getAll(callback) {
    const sql = `SELECT * FROM MenuItems`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new MenuItem(row)));
      }
    });
  }

  //Update a MenuItem by ID
  update(details, callback) {
    this.name = details.name || this.name;
    this.description = details.description || this.description;
    this.price = details.price || this.price;
    this.category = details.category || this.category;

    const sql = `UPDATE MenuItems SET name = ?, description = ?, price = ?, category = ? WHERE id = ?`;

    const params = [this.name, this.description, this.price, this.category, this.id];

    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  //Delete a MenuItem
  static delete(id, callback) {
    const sql = `DELETE FROM MenuItems WHERE id = ?`;

    db.run(sql, [id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'MenuItem deleted successfully'});
      }
    });
  }
}

module.exports = MenuItem;
