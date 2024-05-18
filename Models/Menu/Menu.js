import MenuItem from './MenuItem.js';

class Menu {
  constructor() {
    this.foodMenuItems = [];
    this.drinkMenuItems = [];
  }

  addFoodMenuItem(MenuItem) {
    if (MenuItem.isFood()) {
      this.foodMenuItems.push(MenuItem);
    } else {
      throw new Error('Item is not a food item.');
    }
  }

  addDrinkMenuItem(MenuItem) {
    if (!MenuItem.isFood()) {
      this.drinkMenuItems.push(MenuItem);
    } else {
      throw new Error('Item is not a drink item.');
    }
  }

  removeMenuItem(MenuItem) {
    if (MenuItem.isFood()) {
      this.foodMenuItems.splice(this.foodMenuItems.indexOf(MenuItem), 1);
    } else {
      this.drinkMenuItems.splice(this.drinkMenuItems.indexOf(MenuItem), 1);
    }
  }

  getFoodMenuItems() {
    return this.foodMenuItems;
  }

  getDrinkMenuItems() {
    return this.drinkMenuItems;
  }
}
