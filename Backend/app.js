const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware 
app.use(express.json()); //Parse JSON bodies
app.use(cors());

//Import routes
const reservationRoutes = require('./routes/reservationsRoutes');
const orderRoutes = require('./routes/ordersRoutes');

app.use('/api/reservations', reservationRoutes) // Reservation routes
app.use('/api/orders', orderRoutes) // Order routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});