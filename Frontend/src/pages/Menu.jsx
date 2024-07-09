import { useState, useEffect } from 'react';
import axios from 'axios';

import Cart from '../components/Cart';
import MenuItem from '../components/MenuItem';
import MenuItemContainer from '../components/MenuItemContainer';

import '../styles/Menu.css';

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [order, setOrder] = useState([]);

    //Fetch menu items from the server
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/menuItems');
            console.log('Menu items:', response.data);
            setMenuItems(response.data);
        }
        catch (error) {
            console.error('Error fetching menu items:', error);
        }
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    //Add a menu item to the order
    const addToOrder = (menuItem) => {
        
        const existingItem = order.find(item => item.id === menuItem.id);
        
        if (existingItem) {
            const updatedOrder = order.map(item => {
            if (item.id === menuItem.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
            });
            setOrder(updatedOrder);
        } else {
            setOrder([...order, { ...menuItem, quantity: 1 }]);
        }
    }

    return (
        <div className='menu-page'>
            <h1>Menu</h1>
            <MenuItemContainer menuItems={menuItems} addToOrder={addToOrder}/>
            <Cart order={order}/>
        </div>
    );
};

export default Menu;