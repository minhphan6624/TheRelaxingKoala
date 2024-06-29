import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles//Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState({
        item: '',
        quantity: '',
        price: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/orders'); // Updated URL
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/orders', form); // Updated URL
            setOrders([...orders, response.data]);
            setForm({
                item: '',
                quantity: '',
                price: ''
            });
        } catch (error) {
            console.error('Error creating order', error);
        }
    };

    return (
        <div>
            <h1>Orders</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="item"
                    value={form.item}
                    onChange={handleInputChange}
                    placeholder="Item"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                />
                <button type="submit">Create Order</button>
            </form>
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

export default Orders;
