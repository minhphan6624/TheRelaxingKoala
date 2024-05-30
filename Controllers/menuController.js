const MenuItem = require('../Models/MenuItem');

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

exports.getMenuItemByID = (req, res) => {
  const { id } = req.params;

  MenuItem.findById(id, (err, menuItem) => {
    if (err || !menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  });
};

exports.getAllMenuItems = (req, res) => {
  MenuItem.getAll((err, menuItems) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(menuItems);
  });
};

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

exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  MenuItem.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  });
};

// import MenuItem from '../Models/Menu/MenuItem.mjs';
// import Menu from '../Models/Menu/Menu.mjs';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const sqlite3 = require('sqlite3');
// const { Database } = sqlite3.verbose();

// const db = new Database('../database.sqlite');
// function main() {
//     let menuItemArray = [];
//     menuItemArray[0] = new MenuItem('Burger', 10, true, 'burger.jpg', 'A delicious burger');
//     menuItemArray[1] = new MenuItem('Fries', 5, true, 'fries.jpg', 'A delicious fries');
//     let menu = new Menu(menuItemArray);
//     console.log(menu.getMenuItemByIndex(0));
//     writeMenuToDB(menu);
// }
// function writeMenuToDB(menu) {
//     // Write the menu to the database
//     db.serialize(() => {
//         db.run('CREATE TABLE IF NOT EXISTS menuitems ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, category VARCHAR(255), available TINYINT(1), createdAt DATETIME, updatedAt DATETIME)');
//         let stmt = db.prepare('INSERT INTO menuitems VALUES (?,?,?,?,?,?,?,?)');
//         console.log(menu.length());
//         console.log(menu.menuItems[0].id);
//         for (let i = 0; i < menu.length(); i++) {
//             stmt.run(menu.menuItems[i].id, menu.menuItems[i].name, menu.menuItems[i].description, menu.menuItems[i].price, menu.menuItems[i].isFood, menu.menuItems[i].available, new Date().toISOString(), new Date().toISOString());
//         }
//         stmt.finalize();
//     });
// }
// main();
