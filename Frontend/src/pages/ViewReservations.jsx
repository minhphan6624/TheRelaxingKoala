import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/ViewReservations.css';

//Set up axios to send cookies with every request
axios.defaults.withCredentials = true; 

const CreateReservation = () => {
    // Initialize state to hold fetched reservations
    const [reservations, setReservations] = useState([]);

    // Fetch reservations from the backend
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservations', 
                {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setReservations(response.data); // Set fetched reservations in state
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    // Fetch reservations on component mount
    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className='view-reservation-page'>
            <h1>Reservations</h1>
            <div className='reservations-container'>
                {reservations.map((reservation) => (
                    <div key={reservation.id} className="reservation-card">
                        <p>Customer Name: {reservation.name}</p>
                        <p>Date: {reservation.date}</p>
                        <p>Time: {reservation.time}</p>
                        <p>Number of Guests: {reservation.guestNum}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateReservation;
