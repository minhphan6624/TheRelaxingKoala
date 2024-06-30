const {body, validationResult} = require('express-validator');

const reservationValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body('date').isISO8601().withMessage('Date must be a valid date'),
    body('time').matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:MM format'),
    body('guestNum').isInt({ min: 1 }).withMessage('Guest number must be a positive integer'),
    //handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
]

module.exports = reservationValidator;