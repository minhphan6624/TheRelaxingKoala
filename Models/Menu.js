const db = require('../database');
const MenuItem = require('./MenuItem');

class Menu {
  constructor(menuData) {
    this.id = menuData.id;
    this.name = menuData.name;
    this.description = menuData.description;
    this.items = menuData.items || [];  // Initialize items array
  }

  save(callback) {
    const sql = `INSERT INTO OrderItems (order_id, menu_item_id, quantity, price, special_instructions) VALUES (?, ?, ?, ?, ?)`;
    const params = [this.order_id, this.menu_item_id, this.quantity, this.price, this.special_instructions];

    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  static findByOrderId(order_id, callback) {
    const sql = `SELECT * FROM OrderItems WHERE order_id = ?`;
    db.all(sql, [order_id], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new OrderItem(row)));
      }
    });
  }
}

module.exports = OrderItem;
