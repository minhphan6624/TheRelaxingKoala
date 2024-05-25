import MenuItem from './MenuItem.js';
export class Menu {
    constructor(menuItem) {
        
      if (!(menuItem instanceof MenuItem)) {
        throw new Error('menuItem must be an instance of MenuItem');
    }
    else {
      this.menuItem = menuItem;
    }

    }
}