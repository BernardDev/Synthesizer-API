'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      polyphony: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      keyboard: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      control: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dateProduced: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      memory: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      oscillators: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      filter: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      effects: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Specifications');
  },
};
