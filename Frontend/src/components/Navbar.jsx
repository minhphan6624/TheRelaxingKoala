import {React} from 'react';

import {Link} from 'react-router-dom';

import './styles/Navbar.css';

function Navbar(){
    return(
        <nav>
            <ul>
                <li><Link to="/reservations">Create Reservation</Link></li>
                <li><Link to="/view-reservations">View Reservations</Link></li>
                <li><Link to="/orders">Create Order</Link></li>
                <li><Link to="/view-orders">View Orders</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;