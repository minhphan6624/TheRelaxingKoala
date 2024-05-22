// export class User  {
//   constructor(firstName, lastName, mobileNumber) {
//       this.firsName = firstName; 
//       this.lastName = lastName;
//       this.mobileNumber = mobileNumber;
//   }
//   updatefirstName(firstName) {
//     this.firstName = firstName;
//   }
//   updatelastName(lastName) {
//     this.lastName = lastName;
//   }
//   updatemobileNumber(mobileNumber) {
//     this.mobileNumber = mobileNumber;
//   }
// }

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user'
});

class Customer extends User {}
Customer.init({}, { sequelize, modelName: 'customer' });

class FOHStaff extends User {}
FOHStaff.init({}, { sequelize, modelName: 'fohstaff' });

class KitchenStaff extends User {}
KitchenStaff.init({}, { sequelize, modelName: 'kitchenstaff' });

class Manager extends User {}
Manager.init({}, { sequelize, modelName: 'manager' });

module.exports = { User, Customer, FOHStaff, KitchenStaff, Manager };
class Customer extends User {}
Customer.init({}, { sequelize, modelName: 'customer' });

class FOHStaff extends User {}
FOHStaff.init({}, { sequelize, modelName: 'fohstaff' });

class KitchenStaff extends User {}
KitchenStaff.init({}, { sequelize, modelName: 'kitchenstaff' });

class Manager extends User {}
Manager.init({}, { sequelize, modelName: 'manager' });

module.exports = { User, Customer, FOHStaff, KitchenStaff, Manager };
