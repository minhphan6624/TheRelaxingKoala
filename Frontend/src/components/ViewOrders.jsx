import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ViewOrders.css';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

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

    return (
        <div className="container">
            <h1>Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.item} - {order.quantity} x ${order.price} - {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewOrders;
