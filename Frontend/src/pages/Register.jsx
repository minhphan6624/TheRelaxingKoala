import {Link} from 'react-router-dom';

const Register = () => 
{
    return (
        <div className="register-page">
            <form action="">
            <h1>Register</h1>
            <p> Please fill in this form to create an account</p>

            <label> Username: </label>
            <input type="text" placeholder="Enter Username" required></input>

            <label> Password: </label>
            <input type="text" placeholder="Enter new password" required></input>

            <label> Repeat Password: </label>
            <input type="text" placeholder="Repeat password" required></input>

            <button type="submit" className="registerbtn">Register</button>

            <div className="sign-in link">
                <p>Already have an account? <Link to="/login">Sign In</Link>.</p>
            </div>

            </form>
        </div>
    )
}

export default Register;