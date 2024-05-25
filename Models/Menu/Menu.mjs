import MenuItem from './MenuItem.mjs';
export default class Menu {
    constructor(menuItem) {
      this.menuItem = menuItem;
    }
    getMenuItemByIndex(index) {
      return this.menuItem[index];
    }
      
}