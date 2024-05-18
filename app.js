
const express = require('express')

const sequelize = require('./DB/setup.js');

const app = express();

const port = 3000;


//Set up view engine
app.set('view engine', 'ejs');

// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: 'The Relaxing Koala', message: 'Welcome to the home page' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

