const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {
  static async createOrder(orderData) {
    return await Order.create(orderData, {
      include: [OrderItem]
    });
  }

  async updateOrderDetails(details) {
    this.totalAmount = details.totalAmount || this.totalAmount;
    this.status = details.status || this.status;
    this.specialInstructions = details.specialInstructions || this.specialInstructions;
    this.paymentStatus = details.paymentStatus || this.paymentStatus;
    await this.save();
  }
}

Order.init({
  orderDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unpaid'
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fohStaffId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'order'
});

module.exports = Order;
