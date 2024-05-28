
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;

//Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

//Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Views')));

// Import routes
const indexRoutes = require('./Routes/indexRoutes');
const reservationRoutes = require('./Routes/reservationRoutes');

//Use routes
app.use('/', indexRoutes);
app.use('/api/reservation', reservationRoutes);

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
