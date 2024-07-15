const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');

// @desc Get all orders
// @route GET /api/orders
// @access Public

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: [{ model: OrderItem, include: [MenuItem] }] });

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
        const order = await Order.findByPk(req.params.id, { include: [{ model: OrderItem, include: [MenuItem] }] });
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
    
    // Extract items from the request body
    const {items, ...orderData} = req.body;
    
    try {
        const order = await Order.create(orderData);
        
        // Fetch the prices from the MenuItem model and prepare the order items
        const orderItems = await Promise.all(items.map(async item => {
            
            // Fetch the menu item by ID
            const menuItem = await MenuItem.findByPk(item.id);

            // If the menu item is not found, throw an error
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.id} not found`);
            }

            //Return the order item object
            return {
                quantity: item.quantity,
                price: menuItem.price,
                OrderId: order.id,
                MenuItemId: item.id
            };
        }));

        //Bulk create the order with its item
        await OrderItem.bulkCreate(orderItems);

        // Fetch the created order with its items
        const createdOrder = await Order.findByPk(order.id, { include: [{ model: OrderItem, include: [MenuItem] }] });
        
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Update an order
// @route PUT /api/orders/:id
// @access Public

exports.updateOrder = async (req, res) => {

    //extract items from the request body
    const {items, ...orderData} = req.body;

    try {
        // Update the order details
        const [updated] = await Order.update(orderData, { where: { id: req.params.id } });
        
        if (updated){
            //if items are provided in the request, destroy the existing items and create new ones
            if (items) {
                await OrderItem.destroy({ where: { OrderID: req.params.id } });

                // Fetch the prices from the MenuItem model and prepare the order items
                const newOrderItems = await Promise.all(items.map(async item => {
                    const menuItem = await MenuItem.findByPk(item.menuItemId);
                    if (!menuItem) {
                        throw new Error(`Menu item with ID ${item.menuItemId} not found`);
                    }
                    return {
                        quantity: item.quantity,
                        price: menuItem.price,
                        OrderId: req.params.id,
                        MenuItemId: item.menuItemId
                    };
                }));

                //Bulk create the new order items
                await OrderItem.bulkCreate(newOrderItems);
            }

            const updatedOrder = await Order.findByPk(req.params.id, { include: [{ model: OrderItem, include: [MenuItem] }] });
            
            res.json(updatedOrder)
        }
        else {
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
