
const express = require('express')
const sequelize = require('./Config/database');
const app = express();
const port = 3000;

//Set up view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', require('./Routes/index'));

// Routes
app.use('/orders', require('./Routes/orders'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});
//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// // Sync database and start server
// sequelize.sync()
//   .then(() => {
//     console.log('Database synced successfully.');
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('Unable to connect to the database:', err));