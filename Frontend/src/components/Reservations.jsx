import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        name: '',
        contact: '',
        date: '',
        time: '',
        guestNum: 0,
    });

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation({ ...newReservation, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/reservations', newReservation);
            fetchReservations();
            setNewReservation({
                name: '',
                contact: '',
                date: '',
                time: '',
                guestNum: 0,
            });
        } catch (error) {
            console.error('Error creating reservation', error);
        }
    };

    return (
        <div>
            <h1>Reservations</h1>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.name} - {reservation.date} at {reservation.time} for {reservation.guestNum} guests
                    </li>
                ))}
            </ul>
            <h2>Create a new reservation</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newReservation.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={newReservation.contact}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="date"
                    value={newReservation.date}
                    onChange={handleInputChange}
                />
                <input
                    type="time"
                    name="time"
                    value={newReservation.time}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="guestNum"
                    placeholder="Number of Guests"
                    value={newReservation.guestNum}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Reservation</button>
            </form>
        </div>
    );
};

export default Reservations;
