const MenuItem = require('./models/MenuItem');

// Define the seed data with categories "Food" and "Beverages"
const menuItems = [
    { name: 'Pizza', description: 'Delicious cheese pizza', price: 9.99, category: 'Food' },
    { name: 'Burger', description: 'Juicy beef burger', price: 7.99, category: 'Food' },
    { name: 'Salad', description: 'Fresh garden salad', price: 5.99, category: 'Food' },
    { name: 'Pasta', description: 'Italian pasta with marinara sauce', price: 8.99, category: 'Food' },
    { name: 'Sushi', description: 'Assorted sushi platter', price: 12.99, category: 'Food' },
    { name: 'Coke', description: 'Chilled can of Coca-Cola', price: 1.99, category: 'Beverages' },
    { name: 'Orange Juice', description: 'Freshly squeezed orange juice', price: 3.99, category: 'Beverages' },
    { name: 'Coffee', description: 'Hot brewed coffee', price: 2.99, category: 'Beverages' },
    { name: 'Tea', description: 'Hot brewed tea', price: 2.49, category: 'Beverages' },
    { name: 'Water', description: 'Bottled water', price: 0.99, category: 'Beverages' }
];

// Function to seed the data
const seedMenuItems = async () => {
    try {
        console.log('Seeding menu items...');
        await MenuItem.bulkCreate(menuItems, {
            ignoreDuplicates: true // Avoid inserting duplicates if the server restarts
        });
        console.log('Menu items seeded successfully');
    } catch (error) {
        console.error('Error seeding menu items:', error);
    }
};

module.exports = seedMenuItems;
