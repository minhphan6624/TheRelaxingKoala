const Order = requrie('../Models/Order');

// ---------------------CREATE operations---------------------
exports.createOrder = (req, res) => {
    //Create a new Order object using the request body
    const order = new Order(req.body);

    //Store the order information to the database instace
    order.save((err, newOrderID) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(201).json(newOrderID);
    })
}

// ---------------------READ Operations---------------------
exports.getAllOrders = (req, res) => {

    //Fetch all recorded orders from the DB
    Order.getAll((err, orders) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(200).json(orders);

    })
}

exports.getOrderByID = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else if (!order) {
            return res.status(404).json({ error: 'Order not found!' });
        }

        return res.status(200).json(order );

    })
}

//---------------------UPDATE Operations---------------------
exports.updateOrder = (req, res) => {

    Order.findById(req.params.id, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message }); //Server error
        }
        // If there is no matching order to be found
        else if (!order) {
            return res.status(404).json({ error: "Order not found" }); //Return a 404 error
        }

        //Update the order using the request body
        order.updateOrderDetails(req.body, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message }); //Server error
            } 

            return res.status(200).json({message: 'Order updated'});

        });

    });
}

//---------------------DELETE Operations---------------------
exports.deleteOrder = (req, res) => {
    Order.delete(req.params.id, (err, result) => {
        if (err){
            return res.status(500).json({err: err.message})
        }

        return res.status(200).json(result);
    })
}
 99 changes: 99 additions & 0 deletions99  
Models/Menu.js
Original file line number	Diff line number	Diff line change
@@ -0,0 +1,99 @@
const db = require('../database');
const MenuItem = require('./MenuItem');

class Menu {
  constructor(menuData) {
    this.id = menuData.id;
    this.name = menuData.name;
    this.description = menuData.description;
    this.items = menuData.items || [];  // Initialize items array
  }

  save(callback) {
    const sql = `INSERT INTO Menus (name, description) VALUES (?, ?)`;
    const params = [this.name, this.description];
    db.run(sql, params, function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  static findById(id, callback) {
    const sql = `SELECT * FROM Menus WHERE id = ?`;
    db.get(sql, [id], (err, menuRow) => {
      if (err) {
        callback(err);
      } else if (!menuRow) {
        callback(new Error('Menu not found'));
      } else {
        const menu = new Menu(menuRow);
        // Fetch MenuItems for the menu
        MenuItem.findByMenuId(id, (err, menuItems) => {
          if (err) {
            callback(err);
          } else {
            menu.items = menuItems;
            callback(null, menu);
          }
        });
      }
    });
  }

  static getAll(callback) {
    const sql = `SELECT * FROM Menus`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const menus = [];
        let count = 0;
        rows.forEach(row => {
          const menu = new Menu(row);
          MenuItem.findByMenuId(menu.id, (err, menuItems) => {
            if (err) {
              callback(err);
            } else {
              menu.items = menuItems;
              menus.push(menu);
              count++;
              if (count === rows.length) {
                callback(null, menus);
              }
            }
          });
        });
      }
    });
  }

  update(details, callback) {
    this.name = details.name || this.name;
    this.description = details.description || this.description;
    const sql = `UPDATE Menus SET name = ?, description = ? WHERE id = ?`;
    const params = [this.name, this.description, this.id];
    db.run(sql, params, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  static delete(id, callback) {
    const sql = `DELETE FROM Menus WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'Menu deleted successfully', changes: this.changes });
      }
    });
  }
}

module.exports = Menu;
