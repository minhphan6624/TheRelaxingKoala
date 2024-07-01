import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateOrder = () => {
    const [order, setOrder] = useState({
        customerName: '',
        customerContact: '',
        status: 'pending',
        items: []
    });

    // Initialize state to hold fetched menu items
    const [menuItems, setMenuItems] = useState([]);

    // Initialize state to hold the current item being added to the order
    const [currentItem, setCurrentItem] = useState({ menuItemId: '', quantity: '' });

    // Fetch menu items from the backend
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/menuitems');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    // // Handle item input changes
    // const handleItemChange = (e) => {
    //     const { name, value } = e.target;
    //     setCurrentItem({ ...currentItem, [name]: value });
    // };

    // Add item to order
    const addItem = () => {
        setOrder({ ...order, items: [...order.items, currentItem] });
        setCurrentItem({ menuItemId: '', quantity: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/orders', order);
            alert('Order created successfully!');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const [itemFields, setItemFields] = useState([{ menuItemId: '', quantity: '' }]);

    // Add item field
    const addItemField = () => {
        setItemFields([...itemFields, { menuItemId: '', quantity: '' }]);
    };

    // Handle item input changes
    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFields = [...itemFields];
        updatedFields[index][name] = value;
        setItemFields(updatedFields);
    };

    // Remove item field
    const removeItemField = (index) => {
        const updatedFields = [...itemFields];
        updatedFields.splice(index, 1);
        setItemFields(updatedFields);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer Name:</label>
                <input type="text" name="customerName" value={order.customerName} onChange={handleChange} />
            </div>
            <div>
                <label>Customer Contact:</label>
                <input type="text" name="customerContact" value={order.customerContact} onChange={handleChange} />
            </div>
            {itemFields.map((item, index) => (
                <div key={index}>
                    <label>Menu Item:</label>
                    <select name="menuItemId" value={item.menuItemId} onChange={(e) => handleItemChange(e, index)}>
                        <option value="">Select an item</option>
                        {menuItems.map((menuItem) => (
                            <option key={menuItem.id} value={menuItem.id}>{menuItem.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(e, index)}
                    />
                    {index === itemFields.length - 1 && (
                        <button type="button" onClick={addItemField}>Add Item</button>
                    )}
                    {index !== 0 && (
                        <button type="button" onClick={() => removeItemField(index)}>Remove Item</button>
                    )}
                </div>
            ))}
            <button type="submit">Create Order</button>
        </form>
    );
};

export default CreateOrder;