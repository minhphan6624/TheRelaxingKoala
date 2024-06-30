const {body, validationResult} = require('express-validator');

const orderValidator = [
    body("items").isArray({min : 1}).withMessage("At least one item is required"),
    body('items.*.menuItemId').isInt().withMessage('Invalid menu item ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = orderValidator;