document.addEventListener('DOMContentLoaded', function () {
    const menuItems = [
        { id: 1, name: 'Spaghetti Carbonara', type: 'food', price: 12.99, image: '/img/spaghetti.jpg' },
        { id: 2, name: 'Margherita Pizza', type: 'food', price: 10.99, image: 'path/to/pizza.jpg' },
        { id: 3, name: 'Caesar Salad', type: 'food', price: 8.99, image: 'path/to/salad.jpg' },
        { id: 4, name: 'Grilled Chicken', type: 'food', price: 14.99, image: 'path/to/chicken.jpg' },
        { id: 5, name: 'Beef Steak', type: 'food', price: 18.99, image: 'path/to/steak.jpg' },
        { id: 6, name: 'Salmon Sushi', type: 'food', price: 13.99, image: 'path/to/sushi.jpg' },
        { id: 7, name: 'Pasta Primavera', type: 'food', price: 11.99, image: 'path/to/pasta.jpg' },
        { id: 8, name: 'Chocolate Cake', type: 'food', price: 6.99, image: 'path/to/cake.jpg' },
        { id: 9, name: 'Apple Pie', type: 'food', price: 5.99, image: 'path/to/pie.jpg' },
        { id: 10, name: 'Margarita', type: 'drink', price: 7.99, image: 'path/to/margarita.jpg' },
        { id: 11, name: 'Mojito', type: 'drink', price: 6.99, image: 'path/to/mojito.jpg' },
        { id: 12, name: 'Pina Colada', type: 'drink', price: 8.99, image: 'path/to/pina-colada.jpg' },
        { id: 13, name: 'Lemonade', type: 'drink', price: 3.99, image: 'path/to/lemonade.jpg' },
        { id: 14, name: 'Iced Coffee', type: 'drink', price: 4.99, image: 'path/to/iced-coffee.jpg' },
        { id: 15, name: 'Green Tea', type: 'drink', price: 2.99, image: 'path/to/green-tea.jpg' }
    ];

    const menuContainer = document.getElementById('menuItems');
    const cartContainer = document.getElementById('cartItems');
    let cart = [];

    function renderMenuItems(items) {
        menuContainer.innerHTML = '';
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('col-md-4', 'menu-item');
            menuItem.innerHTML = `
                <h5>${item.name}</h5>
                <img src="${item.image}" alt="${item.name}">
                <p>$${item.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            menuContainer.appendChild(menuItem);
        });
    }

    window.filterItems = function (type) {
        if (type === 'all') {
            renderMenuItems(menuItems);
        } else {
            const filteredItems = menuItems.filter(item => item.type === type);
            renderMenuItems(filteredItems);
        }
    };

    window.addToCart = function (itemId) {
        const item = menuItems.find(item => item.id === itemId);
        cart.push(item);
        renderCartItems();
    };

    function renderCartItems() {
        cartContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    window.removeFromCart = function (itemId) {
        cart = cart.filter(item => item.id !== itemId);
        renderCartItems();
    };

    window.checkout = function () {
        alert('Checkout feature coming soon!');
    };

    // Initial render
    renderMenuItems(menuItems);
});