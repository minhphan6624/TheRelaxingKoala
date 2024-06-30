import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>Welcome to Relaxing Koala</h1>
            <nav>
                <ul>
                    <li><Link to="/reservations">Create Reservation</Link></li>
                    <li><Link to="/view-reservations">View Reservations</Link></li>
                    <li><Link to="/orders">Create Order</Link></li>
                    <li><Link to="/view-orders">View Orders</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
