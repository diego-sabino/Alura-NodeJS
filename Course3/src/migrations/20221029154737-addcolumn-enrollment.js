'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('enrollments', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('enrollments', 'deletedAt');
  }
};