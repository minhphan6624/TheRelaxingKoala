const {Sequelize, DataTypes} = require('sequelize');   

const {sequelize} = require('../db');

const Order = require("./order");
const MenuItem = require('./MenuItem');

const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

//Define the relationship with conrete models
OrderItem.belongsTo(Order, { foreignKey: { allowNull: false } , onDelete: 'CASCADE'});
OrderItem.belongsTo(MenuItem, { foreignKey: { allowNull: false } , onDelete: 'CASCADE'});

Order.hasMany(OrderItem);
MenuItem.hasMany(OrderItem);

module.exports = OrderItem;
