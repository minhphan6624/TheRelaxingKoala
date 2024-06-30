const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Reservation = sequelize.define('Reservation', {
    name: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    guestNum: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true
});

module.exports = Reservation;