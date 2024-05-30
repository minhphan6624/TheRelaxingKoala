const express = require('express');
const router = express.Router();

const menuController = require('../Controllers/menuController');

// Route to get all menu items
router.get('/menu', menuController.getAllMenuItems);

// Routes for menu management (admin use)
router.post('/menu', menuController.createMenuItem);
router.get('/menu/:id', menuController.getMenuItemByID);
router.put('/menu/:id', menuController.updateMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);

module.exports = router;
