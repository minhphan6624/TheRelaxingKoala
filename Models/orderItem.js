const db = require('../config/database');

class OrderItem {
  constructor(orderItemData) {
    this.id = orderItemData.id;
    this.order_id = orderItemData.order_id;
    this.menu_item_id = orderItemData.menu_item_id;
    this.quantity = orderItemData.quantity;
    this.price = orderItemData.price;
    this.notes = orderItemData.notes;
  }


  //Insert a new OrderItem
  save(callback) {
    const sql = `INSERT INTO OrderItems (order_id, menu_item_id, quantity, price, notes) VALUES (?, ?, ?, ?, ?)`;
    
    const params = [this.order_id, this.menu_item_id, this.quantity, this.price, this.notes];

    db.run(sql, params, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Find all the OrderItems that belong to a specific order
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
