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

module.exports = User;
