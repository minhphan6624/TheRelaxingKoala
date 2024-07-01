import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            {orders.map((order) => (
                <div key={order.id}>
                    <p>Customer Name: {order.customerName}</p>
                    <p>Contact: {order.customerContact}</p>
                    <p>Status: {order.status}</p>
                    <ul>
                        {order.OrderItems.map((item) => (
                            <li key={item.id}> {item.MenuItem.name} - {item.quantity}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ViewOrders;
