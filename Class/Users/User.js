export class User  {
  constructor(firstName, lastName, mobileNumber) {
      this.firsName = firstName; 
      this.lastName = lastName;
      this.mobileNumber = mobileNumber;
  }
  updatefirstName(firstName) {
    this.firstName = firstName;
  }
  updatelastName(lastName) {
    this.lastName = lastName;
  }
  updatemobileNumber(mobileNumber) {
    this.mobileNumber = mobileNumber;
  }
}
