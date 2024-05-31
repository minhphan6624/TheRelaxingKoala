const express = require('express');
const router = express.Router();

const menuController = require('../Controllers/menuController');

// Route to get all menu items
router.get('/', menuController.getAllMenuItems);

// Routes for menu management (admin use)
router.post('/', menuController.createMenuItem);
router.get('/:id', menuController.getMenuItemByID);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
