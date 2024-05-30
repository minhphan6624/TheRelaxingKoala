const db = require('../database');
const OrderItem = require('./OrderItem');

class Order {
  constructor(orderData) {
    

    this.id = orderData.id;

    this.customer_name = orderData.customer_name;

    this.order_date = orderData.order_date || new Date().toISOString();
    
    this.total_price = orderData.total_price;

    this.status = orderData.status || 'In progress'; // "In progress", "Finished" For KitchenStaff to update

    this.order_type = orderData.order_type; // "Eat-in", "Takeaway", "Delivery"
    this.delivery_address = orderData.order_type === 'Delivery' ? orderData.delivery_address : null;
    this.customer_contact = orderData.customer_contact;
    
    this.tableID = orderData.order_type === 'Dine-in' ? orderData.tableID : null;

    this.payment_id = orderData.payment_id || null;

    this.notes = orderData.notes || '';
  }

  //Insert a new order to the DB
  save(callback) {
        const sql = `INSERT INTO Orders (customer_name, customer_contact, items, total_price, status, order_date, order_type, delivery_address, payment_method, notes) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const itemsJSON = JSON.stringify(this.items.map(item => item.toJSON()));
        const params = [this.customer_name, this.customer_contact, itemsJSON, this.total_price, this.status, this.order_date, this.order_type, this.delivery_address, this.payment_method, this.notes];

        db.run(sql, params, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, { id: this.lastID });
            }
        });
    }

    //Find an order by ID
    static findById(id, callback) {

        const sql = `SELECT * FROM Orders WHERE id = ?`;

        db.get(sql, [id], (err, row) => {
            
          if (err) {
                callback(err);
            } else if (!row) {
                callback(new Error('Order not found'));
            } else {
                row.items = JSON.parse(row.items).map(item => OrderItem.fromJSON(item));  // Convert to OrderItem objects
                callback(null, new Order(row));
            }
        });
    }

    //Get all orders from the DB
    static getAll(callback) {
        const sql = `SELECT * FROM Orders`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                rows.forEach(row => {
                    row.items = JSON.parse(row.items).map(item => OrderItem.fromJSON(item));  // Convert to OrderItem objects
                });
                callback(null, rows.map(row => new Order(row)));
            }
        });
    }

    //Update order details
    update(details, callback) {
        this.customer_name = details.customer_name || this.customer_name;
        this.customer_contact = details.customer_contact || this.customer_contact;
        this.items = details.items ? details.items.map(item => new OrderItem(item)) : this.items;  // Update items
        this.total_price = details.total_price || this.total_price;
        this.status = details.status || this.status;
        this.order_date = details.order_date || this.order_date;
        this.order_type = details.order_type || this.order_type;
        this.delivery_address = details.order_type === 'Delivery' ? details.delivery_address : this.delivery_address;
        this.payment_method = details.payment_method || this.payment_method;
        this.notes = details.notes || this.notes;

        // const sql = `UPDATE Orders SET customer_name = ?, customer_contact = ?, items = ?, total_price = ?, status = ?, order_date = ?, order_type = ?, delivery_address = ?, payment_method = ?, notes = ? WHERE id = ?`;

        // const itemsJSON = JSON.stringify(this.items.map(item => item.toJSON()));

        // const params = [this.customer_name, this.customer_contact, itemsJSON, this.total_price, this.status, this order_date, this.order_type, this.delivery_address, this.payment_method, this.notes, this.id];

        // db.run(sql, params, (err) => {
        //     if (err) {
        //         callback(err);
        //     } else {
        //         callback(null);
        //     }
        // });
    }

    //Delete an order
    static delete(id, callback) {
        const sql = `DELETE FROM Orders WHERE id = ?`;
        
        db.run(sql, [id], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, { message: 'Order deleted successfully', changes: this.changes });
            }
        });
    }

    //Find an order based on ID along with all the associated OrderItems
    static findWithItems(id, callback) {

        const sql = `SELECT o.*, oi.id AS item_id, oi.menu_item_id, oi.quantity, oi.price, oi.special_instructions
                        FROM Orders o
                        LEFT JOIN OrderItems oi ON o.id = oi.order_id
                        WHERE o.id = ?`;
        
        db.all(sql, [id], (err, rows) => {
            if (err) {
                callback(err);
            } else if (rows.length === 0) {
                callback(null, null);
            } else {
                const order = new Order(rows[0]);
                
                //Add the iterms to the order
                order.items = rows.map(row => new OrderItem({
                    id: row.item_id,
                    order_id: row.id,
                    menu_item_id: row.menu_item_id,
                    quantity: row.quantity,
                    price: row.price,
                    special_instructions: row.special_instructions
                }));
            callback(null, order);
            }
        });
    }

    //Calculate order total
    static calculateTotal(orderId, callback) {
        const sql = `SELECT SUM(quantity * price) as total FROM OrderItems WHERE order_id = ?`;
        db.get(sql, [orderId], (err, row) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, row.total);
          }
        });
      }
}

module.exports = Order