const express = require('express');
const router = express.Router();

const menuItemController = require('../controllers/menuItemController');
const menuItemValidator = require('../middlewares/menuItemValidator');

//Define routes for menuitems
router.get('/', menuItemController.getAllMenuItems);
router.get('/:id', menuItemController.getMenuItemById);
router.post('/', menuItemController.createMenuItem);
router.put('/:id', menuItemController.updateMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;
