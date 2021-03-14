'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Suggestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      polyphony: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      keyboard: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      control: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearProduced: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      memory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      oscillators: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      filter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lfo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      effects: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Suggestions');
  },
};
