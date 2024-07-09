import React from 'react'; 

const Cart = ( {order}) => {
    return (
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
                    <tr>
                        <td> {item.name} </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        <td> {item.price * item.quantity} </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

export default Cart;