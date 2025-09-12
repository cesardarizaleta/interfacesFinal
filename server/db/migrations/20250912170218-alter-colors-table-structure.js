'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove old columns
    await queryInterface.removeColumn('colors', 'hex');
    await queryInterface.removeColumn('colors', 'rgb');
    await queryInterface.removeColumn('colors', 'hsl');

    // Add new columns
    await queryInterface.addColumn('colors', 'color_primary', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#000000'
    });

    await queryInterface.addColumn('colors', 'color_secondary', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#FFFFFF'
    });

    await queryInterface.addColumn('colors', 'color_accent', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#000000'
    });

    await queryInterface.addColumn('colors', 'color_text', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#000000'
    });

    await queryInterface.addColumn('colors', 'background_neutral', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#F5F5F5'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove new columns
    await queryInterface.removeColumn('colors', 'color_primary');
    await queryInterface.removeColumn('colors', 'color_secondary');
    await queryInterface.removeColumn('colors', 'color_accent');
    await queryInterface.removeColumn('colors', 'color_text');
    await queryInterface.removeColumn('colors', 'background_neutral');

    // Add back old columns
    await queryInterface.addColumn('colors', 'hex', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('colors', 'rgb', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('colors', 'hsl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
