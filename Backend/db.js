const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

//Create a seqykize instance and connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Function to establish and verify the connection
const connectDB = async () => {
    
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('MySQL connected...');

        // Sync the models with the database
        await sequelize.sync({ alter : true }); 

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process with a failure code
    }
};



module.exports = { sequelize, connectDB };