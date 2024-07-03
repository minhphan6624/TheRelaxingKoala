import React from 'react'; 

import {Link} from 'react-router-dom';

const Cart = ( {order}) => {
    return (
        <div className='cart'>
            <h2> Cart </h2>
            {
                order.map((item, index) => (
                    <div key={index} className='order-item'>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Cart;