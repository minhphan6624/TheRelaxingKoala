const {DataTypes} = require('sequelize');   

const {sequelize} = require('../db');

const Order = require("./Order");
const MenuItem = require('./MenuItem');

const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false } // Store the price at the time of order    
}, {
    timestamps: false
});

//Define the relationship with conrete models
OrderItem.belongsTo(Order, { foreignKey: { allowNull: false } , onDelete: 'CASCADE'});
OrderItem.belongsTo(MenuItem, { foreignKey: { allowNull: false } , onDelete: 'CASCADE'});

Order.hasMany(OrderItem);
MenuItem.hasMany(OrderItem);

module.exports = OrderItem;
