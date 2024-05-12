export class Table{
constructor(tableId, status = 'avaialble') { // Default status is availble
  this.tableId = tableId;
  this.status = status  ;
}
  // Updating the status of the table
 Update(newStatus)
  this.status = newStatus;
}
// Retrieve the current status of the table
getStatus() {
return this.status;
}
// Retrieve the Table ID
getTableID(){
return this.tableID;
}
