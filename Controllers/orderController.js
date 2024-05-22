const Order = require('../Models/Order');
const OrderItem = require('../Models/OrderItem');
const MenuItem = require('../Models/Menu/MenuItem');

exports.createOrderForm = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({ where: { available: true } });
    res.render('orderForm', { menuItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send(error.message);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, customerId, tableId, fohStaffId, orderItems } = req.body;
    const newOrder = await Order.create({
      totalAmount,
      customerId,
      tableId,
      fohStaffId
    });

    const orderItemsData = orderItems.map(item => ({
      orderId: newOrder.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.bulkCreate(orderItemsData);

    res.status(201).send(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send(error.message);
  }
};
