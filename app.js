
const express = require('express')
const sequelize = require('./Config/database.js');
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

// // Routes
// app.use('/', require('./routes/index'));

// // Sync database and start server
// sequelize.sync()
//   .then(() => {
//     console.log('Database synced successfully.');
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('Unable to connect to the database:', err));