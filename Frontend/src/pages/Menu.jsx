import { useState, useEffect } from 'react';
import axios from 'axios';

import './styles/Menu.css';

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/menuItems');
            setMenuItems(response.data);
        }
        catch (error) {
            console.error('Error fetching menu items:', error);
        }
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);
    return (
        <>
            <h1>Menu</h1>
            <div className='menu-container'>
                {menuItems.map((menuItem) => (
                    <div key={menuItem.id} className='menu-card'>
                        <p>{menuItem.name}</p>
                        <p>{menuItem.description}</p>
                        <p>{menuItem.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Menu;