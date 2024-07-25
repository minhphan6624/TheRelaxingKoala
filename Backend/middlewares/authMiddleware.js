const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]; // Extract token from Bearer string

    if (!token)
    {
        console.error('Access denied, no token provided');
        return res.status(400).send({error: 'Access denied, no token provided'}); //Send an error message if no token is provided
    }

    try 
    {
        const decoded = jwt.verify(token, jwtSecret); //Verify the token
        req.user = decoded; //Set the user in the request object
        next(); 
    }
    catch (error)
    {
        console.error('Access denied, invalid token', error);
        return res.status(500).send({error: 'Access denied, invalid token'}); //Send an error message if the token is invalid
    }
};

module.exports = authenticateJWT;