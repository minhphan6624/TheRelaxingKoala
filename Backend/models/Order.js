const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
    customerName: { type: DataTypes.STRING, allowNull: false },
    customerContact: { type: DataTypes.STRING, allowNull: false },
    status: { 
        type: DataTypes.ENUM('pending', 'preparing', 'ready', 'completed', 'cancelled'), 
        allowNull: false, 
        defaultValue: 'pending' 
    },
}, {
    timestamps: true
});

module.exports = Order;
