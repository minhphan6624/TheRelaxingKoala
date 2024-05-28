export default class Order {
  constructor(orderData) {
    this.orderID = orderData.orderID;
    this.orderDateTime = orderData.orderDateTime || new Date();
    this.totalAmount = orderData.totalAmount; 
    this.status = orderData.status || 'pending';
    this.specialInstructions = orderData.specialInstructions || null;
    this.paymentStatus = orderData.paymentStatus || 'unpaid';
    this.customerId = orderData.customerId;
    this.tableId = orderData.tableId || null;
    this.fohStaffId = orderData.fohStaffId;
    this.orderItems = orderData.orderItems || [];
  }

  async updateOrderDetails(details) {
    this.totalAmount = details.totalAmount || this.totalAmount;
    this.status = details.status || this.status;
    this.specialInstructions = details.specialInstructions || this.specialInstructions;
    this.paymentStatus = details.paymentStatus || this.paymentStatus;
    // Simulate saving to a database
    const index = Order.orders.findIndex(order => order.id === this.id);
    if (index !== -1) {
      Order.orders[index] = this;
    }
  }

  //Store the details of the current Order to the DB
  save(callback) {
    const sql = `INSERT INTO Orders (orderDateTime, totalAmount, status, specialInstructions, paymentStatus, customerId, tableId, fohStaffId, orderItems) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [this.orderDateTime, this.totalAmount, this.status, this.specialInstructions, this.paymentStatus, this.customerId, this.tableId, this.fohStaffId, this.orderItems];
    db.run(sql, params, (result) => {
        if (result && result.lastID) {
            this.orderID = result.lastID;
            callback(null, this);
        } else {
            callback(new Error('Error saving order'));
        }
    });
    }

  //Find an order by ID
  static findById(id, callback) {
    const sql = `SELECT * FROM Orders WHERE id = ?`;
    db.get(sql, [id], (row) => {
        if (row) {
            row.orderItems = JSON.parse(row.orderItems);
            callback(null, new Order(row));
        } else {
            callback(new Error('Order not found'));
        }
    });
  }

  //Get all orders
  static getAll(callback) {
    const sql = `SELECT * FROM Orders`;
    db.all(sql, [], (rows) => {
        rows.forEach(row => {
            row.orderItems = JSON.parse(row.orderItems);
        });
        callback(null, rows.map(row => new Order(row)));
    });
}
}