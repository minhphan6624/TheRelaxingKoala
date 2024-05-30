
import MenuItem from '../Models/Menu/MenuItem.mjs';
import Menu from '../Models/Menu/Menu.mjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3');
const { Database } = sqlite3.verbose();

const db = new Database('../database.sqlite');
function main() {
    let menuItemArray = [];
    menuItemArray[0] = new MenuItem('Burger', 10, true, 'burger.jpg', 'A delicious burger');
    menuItemArray[1] = new MenuItem('Fries', 5, true, 'fries.jpg', 'A delicious fries');
    let menu = new Menu(menuItemArray);
    console.log(menu.getMenuItemByIndex(0));
    writeMenuToDB(menu);
}
function writeMenuToDB(menu) {
    // Write the menu to the database
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS menuitems ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, category VARCHAR(255), available TINYINT(1), createdAt DATETIME, updatedAt DATETIME)');
        let stmt = db.prepare('INSERT INTO menuitems VALUES (?,?,?,?,?,?,?,?)');
        console.log(menu.length());
        console.log(menu.menuItems[0].id);
        for (let i = 0; i < menu.length(); i++) {
            stmt.run(menu.menuItems[i].id, menu.menuItems[i].name, menu.menuItems[i].description, menu.menuItems[i].price, menu.menuItems[i].isFood, menu.menuItems[i].available, new Date().toISOString(), new Date().toISOString());
        }
        stmt.finalize();
    });
}
main();
