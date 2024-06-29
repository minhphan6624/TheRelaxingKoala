import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Reservations.css';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [form, setForm] = useState({
        name: '',
        contact: '',
        date: '',
        time: '',
        numberOfPeople: ''
    });

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reservations'); // Updated URL
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/reservations', form); // Updated URL
            setReservations([...reservations, response.data]);
            setForm({
                name: '',
                contact: '',
                date: '',
                time: '',
                numberOfPeople: ''
            });
        } catch (error) {
            console.error('Error creating reservation', error);
        }
    };

    return (
        <div>
            <h1>Reservations</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={handleInputChange}
                    placeholder="Contact"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="numberOfPeople"
                    value={form.numberOfPeople}
                    onChange={handleInputChange}
                    placeholder="Number of People"
                    required
                />
                <button type="submit">Create Reservation</button>
            </form>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.name} - {reservation.date} {reservation.time} - {reservation.numberOfPeople} people
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservations;
