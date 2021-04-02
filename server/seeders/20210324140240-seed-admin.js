'use strict';

const {Admin} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Admins',
      [
        {
          email: 'bernard@harry.com',
          password: 'onderbroek',
          isAdmin: false,
        },
        {
          email: 'test@test.com',
          password: 'abcd1234',
          isAdmin: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
