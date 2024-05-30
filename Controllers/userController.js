const User = require('../Models/User');
const Staff = require('../models/Staff');
const Manager = require('../models/Manager');
const bcrypt = require('bcrypt'); //For hashing and comparing hased passwords

//Resgister a new user
exports.register = (req, res) => {

    //Get the new username, password and role from the body
    const { username, password, role } = req.body;

    // Perform hashing on the password (10 times)
    bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }

    let user;
    
    //Create a new user object based on the role
    if (role === 'manager') {
        user = new Manager({ username, password: hash });
    } else {
        user = new Staff({ username, password: hash });
    }

    //Insert the user to the db
    user.save((err, savedUser) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.status(201).json(savedUser);
    });
    });
};

// Log in
exports.login = (req, res) => {

    //Get the username and password
    const { username, password } = req.body;

    //Find a user based on the username
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' }); //If there's no user to be found, return an error
    }

    //Compared the input password with the password in the database using hashing
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

    // Create session
    req.session.userId = user.id;
    req.session.role = user.role;
    res.status(200).json({ message: 'Login successful' });
    });

    });
};

//Log out
exports.logout = (req, res) => {

    //Destroy session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.status(200).json({ message: 'Logout successful' });
    });
};
