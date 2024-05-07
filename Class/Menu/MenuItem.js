export class MenuItem {
  constructor(itemName,price, isFood, description='', imagePath='') {
    this.itemName = itemName;
    this.isFood = isFood; //boolean value that tells if the menu item is a food or a drink
    this.price = price;
    this.description = description; //the description of the menu item
    this.imagePath = imagePath; //the path to the image of the menu item
  }

  updatePrice(price) {
    this.price = price;
  }
  updateDescription(description) {
    this.description = description;
  }
  updateImage(imagePath) {
    this.imagePath = imagePath;
  }
  updateItemName(itemName) {
    this.itemName = itemName;
  }
  updateIsFood(isFood) {
    this.isFood = isFood;
  }
}
