const db = require('../database');
const OrderItem = require('./OrderItem');

class Order {
  constructor(orderData) {
    // this.orderID = orderData.orderID;
    // this.orderDateTime = orderData.orderDateTime || new Date();
    // this.totalAmount = orderData.totalAmount;
    // this.status = orderData.status || 'pending';
    // this.specialInstructions = orderData.specialInstructions || null;
    // this.paymentStatus = orderData.paymentStatus || 'unpaid';
    // this.customerId = orderData.customerId;
    // this.tableId = orderData.tableId || null;
    // this.fohStaffId = orderData.fohStaffId;
    // this.orderItems = orderData.orderItems || [];

    this.id = orderData.id;

    this.customer_name = orderData.customer_name;
    this.customer_contact = orderData.customer_contact;
    
    this.items = orderData.items.map(item => new OrderItem(item));  // Convert to OrderItem objects
    
    this.total_price = orderData.total_price;

    this.status = orderData.status || 'Pending';
    
    this.order_date = orderData.order_date || new Date().toISOString();
    this.order_type = orderData.order_type; // "Eat-in", "Takeaway", "Delivery"
    this.delivery_address = orderData.order_type === 'Delivery' ? orderData.delivery_address : '';
    
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
}

module.exports = Order