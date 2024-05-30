const Order = requrie('../Models/Order');
const OrderItem = require('../Models/OrderItem');
const MenuItem = require('../Models/MenuItem');

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
exports.removeOrderItem = (req, res) => {
    const {itemID} = req.params;

    
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