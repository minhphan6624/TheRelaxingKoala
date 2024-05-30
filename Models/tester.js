
import MenuItem from './Menu/MenuItem.mjs';
import Menu from './Menu/Menu.mjs';
import FOHStaff from './User.js';
import KitchenStaff from './User.js';
import Manager from './User.js';

function main() {
    let menuItemArray = [];
    menuItemArray[0] = new MenuItem('Burger', 10, true, 'burger.jpg', 'A delicious burger');
    menuItemArray[1] = new MenuItem('Fries', 5, true, 'fries.jpg', 'A delicious fries');
    let menu = new Menu(menuItemArray);
    console.log(menu.getMenuItemByIndex(0));
    let newCustomer = new Customer('John', 'Doe', '1234567890', "email", "Customer");
    console.log(newCustomer);
    let newFOHStaff = new FOHStaff('Jane', 'Doe', '0987654321', "email", "FOHStaff");
    console.log(newFOHStaff);

}
main();