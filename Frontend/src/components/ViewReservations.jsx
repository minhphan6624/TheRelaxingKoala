import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ViewReservations.css';

const ViewReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservations');

            //Transform the guestNum property to a number
            const updatedReservations = response.data.map(reservation => ({
                ...reservation,
                guestNum: parseInt(reservation.guestNum, 10) // Ensure guestNum is a number
            }));

            setReservations(updatedReservations);

        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    }

    return (
        <div className="container">
            <h1>Reservations</h1>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.name} - {reservation.date} {reservation.time} - {reservation.guestNum} people
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewReservations;
