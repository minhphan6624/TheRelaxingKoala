const {DataTypes, Model} = require('sequelize');

const sequelize = require ('../config/database');

const Customer = require ("./Users");
const Table = require ("./Table");

// Class Definition
class Reservation extends Model {
    }