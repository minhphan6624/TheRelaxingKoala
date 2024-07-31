import React from 'react'; 
import {useNavigate} from 'react-router-dom';

import '../styles/Cart.css';

const Cart = ( {order}) => {

    const navigate = useNavigate();

    return (
        <div className='cart container d-flex flex-column justify-content-center align-items-center p-2 mx-auto' >
            {order.length === 0 ? <h2 className='text-center'> Cart is empty </h2> :
                <div>
                    <h2 className='text-center'> Cart </h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'> Item </th>
                                <th scope='col'> Quantity </th>
                                <th scope='col'> Price </th>
                                <th scope='col'> Total </th>
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
                    <button className="btn btn-secondary" onClick={() => {
                        navigate('/create-order', { state: { order } }); // Navigate with order details
                    }}> Make an order </button>
                </div>
            }
        </div>
    );
}

export default Cart;