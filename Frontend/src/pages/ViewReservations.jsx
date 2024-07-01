import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateReservation = () => {
    // Initialize state to hold fetched reservations
    const [reservations, setReservations] = useState([]);

    // Fetch reservations from the backend
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservations');
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
        <div>
            <h1>Reservations</h1>
            {reservations.map((reservation) => (
                <div key={reservation.id} className="reservation-container">
                    <p>Customer Name: {reservation.name}</p>
                    <p>Date: {reservation.date}</p>
                    <p>Time: {reservation.time}</p>
                    <p>Number of Guests: {reservation.guestNum}</p>
                </div>
            ))}
        </div>
    );
};

export default CreateReservation;
