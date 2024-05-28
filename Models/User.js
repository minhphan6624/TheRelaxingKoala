import e from "express";

let lastId = 0;

export default class User { 
  constructor(firstName, lastName, mobileNumber, emailAddress, userType) {
    if (!firstName || !lastName || !mobileNumber || !emailAddress || !userType) {
      throw new Error("All fields are required.");
    }
    this.id = lastId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNumber = mobileNumber;
    this.emailAddress = emailAddress;
    this.userType = userType;
  }
}

class Customer extends User {
  constructor(id, firstName, lastName, mobileNumber, emailAddress, userType="Customer") {
    super(id, firstName, lastName, mobileNumber, emailAddress, userType);
  }
}

class FOHStaff extends User {
  constructor(id, firstName, lastName, mobileNumber, emailAddress, userType="FOHStaff") {
    super(id, firstName, lastName, mobileNumber, emailAddress, userType);
  }
}

class KitchenStaff extends User {
  constructor(id, firstName, lastName, mobileNumber, emailAddress, userType="KitchenStaff") {
    super(id, firstName, lastName, mobileNumber, emailAddress, userType);
  }
}

class Manager extends User {
  constructor(id, firstName, lastName, mobileNumber, emailAddress, userType="Manager") {
    super(id, firstName, lastName, mobileNumber, emailAddress, userType);
  }
}