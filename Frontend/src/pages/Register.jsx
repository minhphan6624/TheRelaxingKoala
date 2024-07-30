import {Link} from 'react-router-dom';

import '../styles/Register.css';

const Register = () => 
{
    return (
        <div className="register-page">
            <form action="" className="register-form">
                <h1 className='text-center'>Register</h1>
                <p>Please fill in this form to create an account</p>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter Username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter new password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input type="password" className="form-control" id="repeatPassword" placeholder="Repeat password" required />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

                <div className="sign-in link">
                    <p>
                        Already have an account? <Link to="/login">Sign In</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;