'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('fonts', 'drive_file_id', {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'drive_file_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('fonts', 'drive_file_id');
  }
};