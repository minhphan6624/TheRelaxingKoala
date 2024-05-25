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

}