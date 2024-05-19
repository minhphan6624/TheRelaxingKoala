const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class MenuItem extends Model {}

MenuItem.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'menuitem'
});

module.exports = MenuItem;


// export class MenuItem {
//   constructor(itemName,price, isFood, description='', imagePath='') {
//     this.itemName = itemName;
//     this.isFood = isFood; //boolean value that tells if the menu item is a food or a drink
//     this.price = price;
//     this.description = description; //the description of the menu item
//     this.imagePath = imagePath; //the path to the image of the menu item
//   }

//   updatePrice(price) {
//     this.price = price;
//   }
//   updateDescription(description) {
//     this.description = description;
//   }
//   updateImage(imagePath) {
//     this.imagePath = imagePath;
//   }
//   updateItemName(itemName) {
//     this.itemName = itemName;
//   }
//   updateIsFood(isFood) {
//     this.isFood = isFood;
//   }
// }

