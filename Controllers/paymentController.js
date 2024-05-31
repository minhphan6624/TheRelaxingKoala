const Payment = require('../Models/Payment');
const Order = require('../Models/Order')

// Function to create a payment for an order
exports.processPayment = (req, res) => {

    const { order_id, amount, method } = req.body;
    
    // Retrieve the order to validate the payment amount against the total cost of the order
    Order.findById(order_id, (err, order) => {
      if (err || !order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Validate payment amount here if necessary
      const payment = new Payment({
        order_id,
        amount,
        method,
        date: new Date().toISOString()
      });
  
      payment.save((err, savedPayment) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(savedPayment);
      });
    });
};

//Create a new Payment
exports.createPayment = (req, res) => {

    //Get the data from the request body
  const paymentData = req.body;

  //Create a new Payment object based on such data
  const payment = new Payment(paymentData);

  //Insert to the database
  payment.save((err, savedPayment) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(savedPayment);
  });
};

//Get a payment by ID
exports.getPaymentByID = (req, res) => {
  
    //Get the payment ID
    const { id } = req.params;

  Payment.findById(id, (err, payment) => {
    if (err || !payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  });
};


