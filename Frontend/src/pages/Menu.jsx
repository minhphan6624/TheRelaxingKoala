import { useState, useEffect } from 'react';
import axios from 'axios';

import Cart from '../components/Cart';
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

    useEffect(() => {
        console.log(order);
    }, [order]);

    //Add a menu item to the order
    const addToOrder = (menuItem) => {
        
        const existingItem = order.find(item => item.id === menuItem.id);

        if (existingItem) {
            //Create an updated order with a new quantity for the existing item
            const updatedOrder = order.map(item => {
                if (item.id === menuItem.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
            return item;
            });
            setOrder(updatedOrder);
            console.log(order);
        } else {
            setOrder([...order, { ...menuItem, quantity: 1 }]);
        }
    }

    const removeFromOrder = (menuItem) => {
        const existingItem = order.find(item => item.id === menuItem.id);

        if (existingItem.quantity === 1) {
            const updatedOrder = order.filter(item => item.id !== menuItem.id);
            setOrder(updatedOrder);
        } else {
            const updatedOrder = order.map(item => {
                if (item.id === menuItem.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            setOrder(updatedOrder);
        }
    }

    return (
        <div className='menu-page'>
            <h1 className='text-center'>Menu</h1>
            <div className="container">
                <div className="row">
                        <MenuItemContainer menuItems={menuItems} addToOrder={addToOrder}/>
                </div>
                <div className="row">
                    <Cart order={order} removeFromOrder={removeFromOrder}/>
                </div>
            </div>
        </div>
    );
};

export default Menu;