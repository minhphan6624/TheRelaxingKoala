const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const seedMenuItems = require('./seedData'); // Adjust the path as necessary

// Middleware 
app.use(express.json()); //Parse JSON bodies
app.use(cors());

//DB connection
const { connectDB } = require('./db');
connectDB()

//Import routes
const reservationRoutes = require('./routes/reservationsRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/api/reservations', reservationRoutes) // Reservation routes
app.use('/api/orders', orderRoutes) // Order routes
app.use('/api/menuItems', menuItemRoutes) // Menu item routes

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Connect to the database and sync models
connectDB().then(async () => {
  // Seed the menu items after the database is connected and synced
  await seedMenuItems();

  // Start the server
  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});