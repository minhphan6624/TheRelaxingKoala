export class MenuItem {
  constructor(name, price, isFood, imagePath, description) {
    this.name = name;
    this.price = price;
    this.isFood = isFood;
    this.imagePath = imagePath;
    this.description = description;
  }
    get name() {
      return this.name;
    }
    get price() {
      return this.price;
    }
    get isFood() {
      return this.isFood;
    }
    get description() {
      return this.description;
    }

    updateItemName(itemName) {
      this.name = itemName;
    }
    updateItemPrice(itemPrice) {
      this.price = itemPrice;
    }
    updateImagePath(imagePath) {
      this.imagePath = imagePath;
    }
}