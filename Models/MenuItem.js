const db = require('../database');

class MenuItem {
  constructor(menuItemData) {
    this.id = menuItemData.id;
    this.menu_id = menuItemData.menu_id;
    this.name = menuItemData.name;
    this.description = menuItemData.description;
    this.price = menuItemData.price;
  }

  //Insert a new menuItem
  save(callback) {
    const sql = `INSERT INTO MenuItems (menu_id, name, description, price) VALUES (?, ?, ?, ?)`;
    
    const params = [this.menu_id, this.name, this.description, this.price];
    
    db.run(sql, params, function (err) {
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
    this.menu_id = details.menu_id || this.menu_id;
    this.name = details.name || this.name;
    this.description = details.description || this.description;
    this.price = details.price || this.price;
    const sql = `UPDATE MenuItems SET menu_id = ?, name = ?, description = ?, price = ? WHERE id = ?`;
    const params = [this.menu_id, this.name, this.description, this.price, this.id];
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
    db.run(sql, [id], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'MenuItem deleted successfully', changes: this.changes });
      }
    });
  }
}

module.exports = MenuItem;
