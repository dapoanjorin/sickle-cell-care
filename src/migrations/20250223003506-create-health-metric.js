'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthMetrics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE
      },
      heartRate: {
        type: Sequelize.DECIMAL
      },
      bloodOxygenLevel: {
        type: Sequelize.DECIMAL
      },
      temperature: {
        type: Sequelize.DECIMAL
      },
      painLevel: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HealthMetrics');
  }
};