const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {sequelize} = require('../db');
const jwtSecret = process.env.JWT_SECRET;

//@desc Register a new user
router.post('/register', async (req, res) => {
    
    const {username, password} = req.body; //Get the username and password from the request body

    try 
    {
        const hasedPassword = await bcrypt.hash(password, 10); //Hash the password 
        const [results] = await sequelize.query(
            'INSERT INTO users (username, password) VALUES (?, ?)', 
            {replacements: [username, hasedPassword]}
        );
    
        console.log(results);
        return res.status(201).json({message : 'User created successfully'});
    }
    catch (error)
    {
        res.status(400).send({error: 'Registration failed, ' + error.message}); //Send an error message
    }
});

//@desc Login a user
router.post('/login', async (req, res) => {
    const {username, password} = req.body; //Get the username and password fromt the request body

    try 
    {
        // const [result] = await sequelize.query(
        //     'SELECT * FROM users WHERRE username = ?',
        //     {replacements: [username]}
        // );

        // const user = result[0]; //Get the first from the result

        const user = await User.findOne({ where: { username } }); //Find the user with the given username

        //If the user does not exist, send an error message
        if (!user)
        {
            return res.status(400).send({error : 'Invalid username or password'});
        }

        //Compare the password with the hashed password
        const isValid = await bcrypt.compare(password, user.password); 
        if (!isValid)
        {
            return res.status(400).send({error : 'Invalid username or password'});
        }

        //Create a JWT token
        const token = jwt.sign({id: user.id, username : user.username}, jwtSecret); 

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'strict'}); //set the token in a http -only cookie
        
        return res.status(200).send({message: "login successful!"}); //Send the token as a response
    }
    catch (err)
    {
        res.status(500).send({error : 'Login failed. ' + err.message}); 
    }
});

module.exports = router;
