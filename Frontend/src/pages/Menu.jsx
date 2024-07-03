import { useState, useEffect } from 'react';
import axios from 'axios';

import MenuItem from '../components/MenuItem';

import './styles/Menu.css';

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [order, setOrder] = useState([]);

    //Fetch menu items from the server
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/menuItems');
            setMenuItems(response.data);
        }
        catch (error) {
            console.error('Error fetching menu items:', error);
        }
    }

    //Add a menu item to the order
    const addToOrder = (menuItem) => {
        setOrder([...order, {...menuItem, quantity: 1}]);
    }


    useEffect(() => {
        fetchMenuItems();
    }, []);


    return (
        <div className='menu-page'>
            <h1>Menu</h1>
            <div className='menu-container'>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} addToOrderCallback={() => addToOrder(item)} />
                ))}
            </div>
        </div>
    );
};

export default Menu;