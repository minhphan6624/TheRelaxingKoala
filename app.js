const express = require('express');
const app = express();
const port = 3000;

// Middleware 
app.use(express.json()); //Parse JSON bodies

//Import routes
reservationRoutes = require('./routes/reservationsRoutes');

app.use('api/reservations', reservationRoutes) // Reservation routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});