import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-page">
            <form className="login-form">
                <h2>Login</h2>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>

                <div className="sign-in link">
                    <p>Don't have an account? <Link to="/register">Sign up </Link></p>
            </div>
            </form>
        </div>
    )
}

export default Login;