const db = require('../database');
const MenuItem = require('./MenuItem');

class Menu {
  constructor(menuData) {
    this.id = menuData.id;
    this.name = menuData.name;
    this.description = menuData.description;
    this.items = menuData.items || [];  // Initialize items array
  }

  //Insert a menu to the DB
  save(callback) {
    const sql = `INSERT INTO Menus (name, description) VALUES (?, ?)`;
    const params = [this.name, this.description];
    db.run(sql, params, function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Find a menu by ID
  static findById(id, callback) {
    const sql = `SELECT * FROM Menus WHERE id = ?`;
    db.get(sql, [id], (err, menuRow) => {
      if (err) {
        callback(err);
      } else if (!menuRow) {
        callback(new Error('Menu not found'));
      } else {
        const menu = new Menu(menuRow);
        // Fetch MenuItems for the menu
        MenuItem.findByMenuId(id, (err, menuItems) => {
          if (err) {
            callback(err);
          } else {
            menu.items = menuItems;
            callback(null, menu);
          }
        });
      }
    });
  }

  //Get all menus
  static getAll(callback) {
    const sql = `SELECT * FROM Menus`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const menus = [];
        let count = 0;
        rows.forEach(row => {
          const menu = new Menu(row);
          MenuItem.findByMenuId(menu.id, (err, menuItems) => {
            if (err) {
              callback(err);
            } else {
              menu.items = menuItems;
              menus.push(menu);
              count++;
              if (count === rows.length) {
                callback(null, menus);
              }
            }
          });
        });
      }
    });
  }

  update(details, callback) {
    this.name = details.name || this.name;
    this.description = details.description || this.description;
    const sql = `UPDATE Menus SET name = ?, description = ? WHERE id = ?`;
    const params = [this.name, this.description, this.id];
    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  static delete(id, callback) {
    const sql = `DELETE FROM Menus WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'Menu deleted successfully', changes: this.changes });
      }
    });
  }
}

module.exports = Menu;
