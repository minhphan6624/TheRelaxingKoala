const sequelize = require('./DB/setup.js');

const express = require('express')

const port = 3000;

const app = express();

//Set up view engine
app.set('view engine', 'ejs');

// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello, World!', message: 'Welcome to the EJS example.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

