'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'example@example.com',
          key: 'thisiskey',
          count: 1,
        },
        {
          email: 'bernardwittgen@hotmail.com',
          key: 'GVMVW12-1XK4W8E-HEND0CT-DVDB4DE',
          count: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
