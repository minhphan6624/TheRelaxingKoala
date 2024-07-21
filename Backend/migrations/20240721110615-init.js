'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Reservation', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      contact: { type: Sequelize.STRING, allowNull: false },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      time: { type: Sequelize.TIME, allowNull: false },
      guestNum: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE},
      updatedAt: { allowNull: false, type: Sequelize.DATE}
    });

    await queryInterface.createTable('Order', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      customerName: { type: Sequelize.STRING, allowNull: false },
      customerContact: { type: Sequelize.STRING, allowNull: false }, 
      status: { type: Sequelize.ENUM('pending', 'preparing', 'ready', 'completed', 'cancelled'), allowNull: false, defaultValue: 'pending' },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Reservations');
  }
};
