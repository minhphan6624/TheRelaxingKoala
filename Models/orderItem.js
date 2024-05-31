const db = require('../database');

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

    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  //Update an OrderItem
  update(details, callback) {
    this.quantity = details.quantity || this.quantity;
    this.price = details.price || this.price;
    this.notes = details.notes || this.notes;

    const sql = `UPDATE OrderItems SET quantity = ?, price = ?, notes = ? WHERE id = ?`;

    const params = [this.quantity, this.price, this.notes, this.id];

    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
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

  //Delete an orderItem based on its ID
  static delete(id, callback) {
    const sql = `DELETE FROM OrderItems WHERE id = ?`;
    db.run(sql, [id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'Order item deleted successfully'});
      }
    });
  }
 //nothing special
  //Delete all orderItems based in an order's ID
  static deleteByOrderId(order_id, callback) {
    const sql = `DELETE FROM OrderItems WHERE order_id = ?`;
    db.run(sql, [order_id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'Order items deleted successfully'});
      }
    });
  }

}

module.exports = OrderItem;
