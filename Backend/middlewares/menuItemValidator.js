const  {body, validationResult} = require('express-validator');

const menuItemValidator = [

    // Validate name, price, description, and category
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),

    // Validate price as a positive number
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    
]

module.exports = menuItemValidator;