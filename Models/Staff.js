const User = require('./User');

class Staff extends User {
  constructor(userData) {
    super(userData);
    this.role = 'staff';
  }
}

module.exports = Staff;
