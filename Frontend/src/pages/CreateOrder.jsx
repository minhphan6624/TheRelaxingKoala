
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

import '../styles/CreateOrder.css';

const CreateOrder = () => {
    
    const location = useLocation();
    const orderDetails = location.state.order;

    const [customerDetails, setCustomerDetails] = useState({
        customerName: "",
        customerContact: ""
    });
    const [paymentDetails, setPaymentDetails] = useState([]);

    const handleCustomerDetailsChange = (e) => {
        const {name, value} = e.target;
        setCustomerDetails({...customerDetails, [name]: value});
    }

    const handlePaymentDetailsChange = (e) => {
        const {name, value } = e.target;
        setPaymentDetails({...paymentDetails, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Test with an alert message
        // alert('Order created successfully!');
        // console.log(customerDetails, paymentDetails, orderDetails)

        //Actual code to create an order
        const orderData = {
            ...customerDetails,
            items : orderDetails.map((item) => (
                {
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }
            )),
        }

        try 
        {
            //Make a post request to create an order
            await axios.post('http://localhost:3000/api/orders', orderData);
            alert('Order created successfully!');
        }
        catch (error)
        {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        }
    }

    return (
        <div>
            <h2> Order Details </h2>
            {/* Display order details */}

            <div className='order-details-table'>
            <table>
                <thead>
                    <tr>
                        <th> Item </th>
                        <th> Quantity </th>
                        <th> Price </th>
                        <th> Total </th>
                    </tr>
                </thead>
                <tbody>
                {orderDetails.map((item) => (
                    <tr key={item.id}>
                        <td> {item.name} </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        <td> {item.price * item.quantity} </td>
                    </tr>
                ))}
                </tbody>

            </table>

            <div className='customer-form-container'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend> Customer details </legend>
                        <div className="form-group">
                            <label>Customer Name:</label>
                            <input type="text" name="customerName" value={customerDetails.customerName} onChange={handleCustomerDetailsChange} />
                        </div>
                        <div className="form-group">
                            <label>Contact:</label>
                            <input type="text" name="customerContact" value={customerDetails.customerContact} onChange={handleCustomerDetailsChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Payment Details</legend>

                        <div className="form-group">
                            <label>Name on card
                            <input type="text" name="cardName" value={paymentDetails.cardName} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Card Type:
                            <select name="cardType" id="cardType">
                                <option value="visa">Visa</option>			
                                <option value="master">MasterCard</option>
                                <option value="amex">American Express</option>
                            </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Card Number:
                            <input type="number" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Expiry date:
                            <input type="text" name="exprDate" value={paymentDetails.exprDate} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>CVC
                            <input type="number" name="cvc" value={paymentDetails.cvc} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                    </fieldset>
                        <input type="submit" value="Check Out"/>
                </form>
                
            </div>

        </div>


        </div>
    );
}


export default CreateOrder;