const MenuItem = require('../models/MenuItem');

// Define controller methods for menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const [updated] = await MenuItem.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedMenuItem = await MenuItem.findByPk(req.params.id);
            res.json(updatedMenuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const deleted = await MenuItem.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Menu item deleted' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};