'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Patients', 'password', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Patients', 'password');
    }
};