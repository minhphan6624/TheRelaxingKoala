
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'

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
        alert('Order created successfully!');

        //Actual code to create an order
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
                            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} />
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
                            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Expiry date:
                            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>CVC
                            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} />
                            </label>
                        </div>

                        <input type="submit" value="Check Out"/>
                    </fieldset>
                </form>
                
            </div>

            

        </div>


        </div>
    );
}


export default CreateOrder;