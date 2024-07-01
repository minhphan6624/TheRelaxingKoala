import { React } from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
        <nav className='navbar-container'>
            <h1> The Relaxing Koala </h1>
            <ul>
                <li><Link to="/menu"> Menu </Link></li>
                <li><Link to="/create-reservation">Create Reservation</Link></li>
                <li><Link to="/view-reservations">View Reservations</Link></li>
                <li><Link to="/create-order">Create Order</Link></li>
                <li><Link to="/view-orders">View Orders</Link></li>

            </ul>
        </nav>
    );
}

export default Navbar;