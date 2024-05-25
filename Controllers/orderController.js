
import MenuItem from './Menu/MenuItem.mjs';
import Menu from './Menu/Menu.mjs';
function main() {
    let menuItemArray = [];
    menuItemArray[0] = new MenuItem('Burger', 10, true, 'burger.jpg', 'A delicious burger');
    menuItemArray[1] = new MenuItem('Fries', 5, true, 'fries.jpg', 'A delicious fries');
    let menu = new Menu(menuItemArray);
    console.log(menu.getMenuItemByIndex(0));
}
main();