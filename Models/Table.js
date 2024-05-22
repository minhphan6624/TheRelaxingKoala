// export class Table{
// constructor(tableId, status = 'avaialble') { // Default status is availble
//   this.tableId = tableId;
//   this.status = status  ;
// }
//   // Updating the status of the table
//  Update(newStatus)
//   this.status = newStatus;
// }
// // Retrieve the current status of the table
// getStatus() {
// return this.status;
// }
// // Retrieve the Table ID
// getTableID(){
// return this.tableID;
// }


const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Table = sequelize.define('table', {
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
  tableStatus: {
    type: DataTypes.ENUM('free', 'reserved'),
    allowNull: false
  }
});

module.exports = Table;