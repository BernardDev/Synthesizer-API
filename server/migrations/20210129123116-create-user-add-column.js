'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'count', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'count');
  },
};
