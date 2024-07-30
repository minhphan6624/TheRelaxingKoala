import React, { useState } from 'react';
import axios from 'axios';

import '../styles/CreateReservation.css';

const CreateReservation = () => {
    const [reservation, setReservation] = useState({
        name: '',
        contact: '',
        date: '',
        time: '',
        guestNum: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    // Make a post request upon form submission
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
        <div className='reservation-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Customer Name:</label>
                    <input className="form-control" type="text" name="name" value={reservation.name} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Contact details:</label>
                    <input className="form-control" type="text" name="contact" value={reservation.contact} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <input className="form-control" type="date" name="date" value={reservation.date} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Time:</label>
                    <input className="form-control" type="time" name="time" value={reservation.time} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Number of Guests:</label>
                    <input className="form-control" type="number" name="guestNum" value={reservation.guestNum} onChange={handleChange} />
                </div>
                <button className="btn btn-primary" type="submit">Create Reservation</button>
            </form>
        </div>
    );
};

export default CreateReservation;