const Order = require('../Models/Order');

exports.createOrderForm = (req, res) => {
  res.render('orderForm');
};

exports.createOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const newOrder = await Order.createOrder({ totalAmount });
    res.status(201).send(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send(error);
  }
};
