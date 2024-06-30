const Order = require('../models/order');

// @desc Get all orders
// @route GET /api/orders
// @access Public

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Get an order by ID
// @route GET /api/orders/:id
// @access Public

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//desc Create a new order
// @route POST /api/orders
// @access Public

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Update an order
// @route PUT /api/orders/:id
// @access Public

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        
        if (order) {
            order.update(req.body);
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Public

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            order.destroy();
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

// @desc Get all orders by status
// @route GET /api/orders/status/:status
// @access Public

exports.getOrdersByStatus = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { status: req.params.status } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
