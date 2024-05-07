
import MenuItem from './MenuItem.js';
class Menu { //ensure to create a seperate menu object for food and drinks determined by if MenuItem.isFood()
  constructor(MenuItemArr = [])
  {
    this.MenuItemArr = MenuItemArr;
  }
  addMenuItem(MenuItem)
  {
    this.MenuItemArr.push(MenuItem);
  }
  removeMenuItem(MenuItem)
  {
    this.MenuItemArr.splice(this.MenuItemArr.indexOf(MenuItem), 1);
  }
  getMenuItems()
  {
    return this.MenuItemArr;
  }
}
