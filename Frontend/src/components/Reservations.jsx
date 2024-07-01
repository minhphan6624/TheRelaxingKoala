import React, { useState } from 'react';
import axios from 'axios';

const Reservation = () => {
    const [reservation, setReservation] = useState({
        name: '',
        contact : '',
        date: '',
        time: '',
        guestNum: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/reservations', reservation);
            alert('Reservation created successfully!');
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    // Render reservation form
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer Name:</label>
                <input type="text" name="name" value={reservation.name} onChange={handleChange} />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" name="date" value={reservation.date} onChange={handleChange} />
            </div>
            <div>
                <label>Time:</label>
                <input type="time" name="time" value={reservation.time} onChange={handleChange} />
            </div>
            <div>
                <label>Number of Guests:</label>
                <input type="number" name="guestNum" value={reservation.guestNum} onChange={handleChange} />
            </div>
            <button type="submit">Create Reservation</button>
        </form>
    );
};

export default Reservation;
