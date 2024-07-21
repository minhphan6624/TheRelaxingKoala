const {DataTypes, Sequelize} = require('sequelize');

const {sequelize} = require('../db');

const User = sequelize.define('User', {
    username: {type : DataTypes.STRING, allowNull: false, unique: true},
    password: {type : DataTypes.STRING, allowNUll: false}
},{
    timestamps: false
}
);

module.exports = User;