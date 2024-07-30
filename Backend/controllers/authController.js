const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {sequelize} = require('../db');
const jwtSecret = process.env.JWT_SECRET;

exports.loginUser() = async (req, res) => {
    const {username, password} = req.body;

    try
    {
        const [result] = await sequelize.query (
            'SELECT * FROM users WHERE username = ?',
            {replacements: [username]}
        );

        const user = result[0];

        //If the user does not exist, send an error message
        if (!user)
        {
            return res.status(400).send({error: 'Invalid username or password'});
        }

        //Compare the password with the hashed password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid)
        {
            return res.status(400).send({error: 'Invalid username or password'});
        }

        //Generate a JWT token
        const token = jwt.sign({username: user.username}, jwtSecret);

        return res.json({token});
    }
    catch (error)
    {
        return res.status(400).send({error: 'Login failed, ' + error.message});
    }
}

exports.logoutUser() = async (req, res) => {
    // Clear the JWT token from the client-side
    res.clearCookie('token');

    // Send a success response
    return res.status(200).send({ message: 'Logout successful' });

}

exports.registerUser() = async (req, res) => {

    const {username, password} = req.body;

    const hasedPassword = await bcrypt.hash(password, 10);

    try
    {
        const [results] = await sequelize.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            {replacements: [username, hasedPassword]}
        );

        return res.status(201).json({message: 'User created successfully'});
    }
    catch (error)
    {
        return res.status(400).send({error: 'Registration failed, ' + error.message});
    }
}

