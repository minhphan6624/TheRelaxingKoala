
const express = require('express')
const app = express();
const port = 3000;

const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override');
const path = require('path');


//Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

//Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(methodOverride('_method')); //Method to 

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Views')));

// Import routes
const indexRoutes = require('./Routes/indexRoutes');
const reservationRoutes = require('./Routes/reservationRoutes');
// const userRoutes = require('./Routes/userRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const menuRoutes = require('./Routes/menuRoutes');

//Use routes
app.use('/', indexRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/menu', menuRoutes);
// app.use('/api/user', userRoutes);

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
