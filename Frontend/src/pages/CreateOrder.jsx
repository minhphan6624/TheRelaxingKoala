
import {useState, useEffect} from 'react';
import axios from 'axios';

import '../styles/CreateOrder.css';

const CreateOrder = () => {

    const [menuItems, setMenuItems] = useState([]);

    const [customerDetails, setCustomerDetails] = useState({
        customerName: '',
        customerContact: '',
        status: ''
    });    

    const [selectedItems, setSelectedItems] = useState({ id: '', quantity: 1 });

    //Fetch all menu items from the server
    useEffect(() => {
        const fetchMenuItems = async () => {
            try 
            {
                const response = await axios.get('http://localhost:3000/api/menuItems');
                setMenuItems(response.data);
            }
            catch (error)
            {
                console.error('Error fetching menu items:', error);
            }
        }

        fetchMenuItems();
    });

    //Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    }

    const handleMenuItemChange = (e) => {
        const { name, value } = e.target;
        
        setSelectedItems({...selectedItems, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.prevenDefault();
        //Create a new order object
        const menuItem = menuItems.find((item) => item.id === selectedItems.id);

        const order = {
            customerName: customerDetails.customerName,
            customerContact: customerDetails.customerContact,
            status: customerDetails.status,
            menuItems: [menuItem]
        };

        try {
            const response = await axios.post('http://localhost:3000/api/orders', order);
            alert('Order created successfully!');
            setCustomerDetails({ customerName: '', customerContact: '', status: 'pending' });
            setSelectedItems({ id: '', quantity: 1 });
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    return (
        <div className='order-form-container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer Name:</label>
                    <input type="text" name="customerName" value={customerDetails.customerName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Contact:</label>
                    <input type="text" name="customerContact" value={customerDetails.customerContact} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={customerDetails.status} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Menu Items:</label>
                    <select name="menuItems" value={selectedItems} onChange={handleMenuItemChange}>
                        {menuItems.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={selectedItems.quantity}
                        onChange={handleMenuItemChange}
                        min="1"
                        required
                    />
                </div>
                
                <button type="submit">Create Order</button>
            </form>

        </div>
    );
}

export default CreateOrder;