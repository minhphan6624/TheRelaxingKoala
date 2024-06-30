const Order = require('../Models/Order');
const OrderItem = require('../Models/OrderItem');
const MenuItem = require('../Models/MenuItem');
// -------------- Order Routes --------------
exports.createOrder = (req, res) => {
    
    //Get the variables from the request body
    const { customer_name, order_date, status, order_type, table_id, delivery_address } = req.body;
    
    //Set the optional attributes
    const orderData = {
    customer_name,
    order_date,
    status,
    order_type,
    table_id: order_type === 'dine-in' ? table_id : null,
    delivery_address: order_type === 'delivery' ? delivery_address : null
    };

    const order = new Order(orderData);

    //Store the order information to the database instace
    order.save((err, newOrderID) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(201).json(newOrderID);
    })
}

//Get all orders
exports.getAllOrders = (req, res) => {

    //Fetch all recorded orders from the DB
    Order.getAll((err, orders) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(200).json(orders);

    })
}

//Get an orderBy ID
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

//Get an orderBy ID with items
exports.getOrderWithItems = (req, res) => {

    const {id} = req.params;

    Order.findWithItems(id, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else if (!order) {
            return res.status(404).json({ error: 'Order not found!' });
        }

        return res.status(200).json(order );

    })
}

//Update an order's info
exports.updateOrder = (req, res) => {
    
    const { id } = req.params;
    
    const updatedDetails = req.body;
  
    Order.findById(id, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else if (!order) {
            return res.status(404).json({ error: 'Order not found!' });
        }
  
        order.update(updatedDetails, (err) => {
            if (err) {
            return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Order updated successfully' });
        });
    });
  };

//Delete an order
exports.deleteOrder = (req, res) => {
    Order.delete(req.params.id, (err, result) => {
        if (err){
            return res.status(500).json({err: err.message})
        }

        return res.status(200).json(result);
    })
}

// -------------- OrderItem Routes --------------
// Add an order Item to the order
exports.addOrderItem = (req, res) => {

    //Get the orderID
    const { orderId } = req.params;

    //Get the variables from the request body
    const { menu_item_id, quantity, price, notes } = req.body;
    
    MenuItem.findById(menu_item_id, (err, menuItem) => {
        //Set the orderID to the current order being updated
        const orderItemData = {
            order_id: orderId,
            menu_item_id,
            quantity,
            price: menuItem.price,
            notes
        };
    
      // Create a new orderItem
      const orderItem = new OrderItem(orderItemData);
  
      // Add it to the DB
      orderItem.save((err, savedItem) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
    
        res.status(201).json(savedItem);
      });
    });
    
  };
  
//Remove an orderItem from an Order
exports.removeOrderItem = (req, res) => {

    const { itemId } = req.params;

    OrderItem.delete(itemId, (err) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Order item removed successfully' });
    });
};


