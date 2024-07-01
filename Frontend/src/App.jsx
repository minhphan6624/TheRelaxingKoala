import React from 'react';

import { Route, Routes } from 'react-router-dom';

import NavBar from './components/Navbar';
import CreateOrder from './pages/CreateOrder';
import ViewOrders from './pages/ViewOrders';
import ViewReservations from './pages/ViewReservations';
import CreateReservation from './pages/CreateReservation'
import Menu from './pages/Menu';
import './App.css';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/create-order" element={<CreateOrder />} />
                <Route path="/view-orders" element={<ViewOrders />} />
                <Route path="/view-reservations" element={<ViewReservations />} />
                <Route path="/create-reservation" element={<CreateReservation />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </>
    );
}

export default App;
