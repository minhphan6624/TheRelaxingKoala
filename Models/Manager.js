const User = require('User');

class Manager extends User {
  constructor(userData) {
    super(userData);
    this.role = 'manager';
  }
}

module.exports = Manager;
