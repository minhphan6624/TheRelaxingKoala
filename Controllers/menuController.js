const MenuItem = require('../Models/MenuItem');

//Create a menu Item
exports.createMenuItem = (req, res) => {
  const { name, description, price, category } = req.body;

  const menuItem = new MenuItem(req.body);

  menuItem.save((err, savedMenuItem) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(savedMenuItem);
  });
};

//Get a menuItem by ID
exports.getMenuItemByID = (req, res) => {
  const { id } = req.params;

  MenuItem.findById(id, (err, menuItem) => {
    if (err || !menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  });
};

//Get all menuItems
exports.getAllMenuItems = (req, res) => {
  MenuItem.getAll((err, menuItems) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(menuItems);
  });
};

//Update a menu item
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const updatedDetails = req.body;

  MenuItem.findById(id, (err, menuItem) => {
    if (err || !menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    menuItem.update(updatedDetails, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Menu item updated successfully' });
    });
  });
};

//Delete a menu item
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  MenuItem.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  });
};

