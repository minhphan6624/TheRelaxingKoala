import React from 'react'; 
import {useNavigate} from 'react-router-dom';

import '../styles/Cart.css';

const Cart = ( {order}) => {

    const navigate = useNavigate();

    return (
        order.length === 0 ? <h2> Cart is empty </h2> :
        <div className='cart'>
            <h2> Cart </h2>
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
                {order.map((item) => (
                    <tr key={item.id}>
                        <td> {item.name} </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        <td> {item.price * item.quantity} </td>
                    </tr>
                ))}
                </tbody>

            </table>

            <button onClick={() => {
                navigate('/create-order', { state: {order} }); // Navigate with order details
            }}> Make an order </button>
        </div>
    );
}

export default Cart;