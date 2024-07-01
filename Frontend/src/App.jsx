import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/Navbar';
import Orders from './components/Orders';
import ViewOrders from './components/ViewOrders';
import ViewReservations from './components/ViewReservations';
import Reservations from './components/Reservations'

import './App.css';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/orders" component={Orders} />
                    <Route path="/view-order" component={ViewOrders} />
                    <Route path="/reservations" component={Reservations} />
                    <Route path="/view-reservation" component={ViewReservations} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
