import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        item: '',
        quantity: 0,
        price: 0,
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/orders', newOrder);
            fetchOrders();
            setNewOrder({
                item: '',
                quantity: 0,
                price: 0,
            });
        } catch (error) {
            console.error('Error creating order', error);
        }
    };

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.item} - {order.quantity} @ ${order.price}
                    </li>
                ))}
            </ul>
            <h2>Create a new order</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="item"
                    placeholder="Item"
                    value={newOrder.item}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newOrder.price}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default Orders;
