'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('people', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('people', 'deletedAt');
  }
};