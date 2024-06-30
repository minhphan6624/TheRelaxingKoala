import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Reservations from './components/Reservations';
import ViewReservations from './components/ViewReservations';
import Orders from './components/Orders';
import ViewOrders from './components/ViewOrders';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/view-reservations" element={<ViewReservations />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/view-orders" element={<ViewOrders />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
