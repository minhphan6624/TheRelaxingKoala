const {Sequelize, DataTypes} = require('sequelize');

const {sequelize} = require('../db');
const { name } = require('ejs');

const MenuItem = sequelize.define('MenuItem', {
    name: { type: DataTypes.STRING, allowNull: false },
    description : { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false }
},  {
    timestamps: false
});

module.exports = MenuItem;