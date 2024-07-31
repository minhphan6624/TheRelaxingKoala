import { Link } from "react-router-dom";

import '../styles/Login.css';
import { useState } from "react";

import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });

            const token = response.data.token; // Extract token from response

            localStorage.setItem('token', token); //Store token in 
            window.location.href = '/'; // Redirect to home page after login
        }
        catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to login');
        }
    }

    return (
        <div className="login-page container d-flex flex-column justify-content-center align-items-center">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input className="form-control" id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>

                <div className="sign-in link">
                    <p>Don't have an account? <Link to="/register">Sign up </Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;