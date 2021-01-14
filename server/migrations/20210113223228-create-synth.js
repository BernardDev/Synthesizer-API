'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Synths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      img: {type: Sequelize.STRING, allowNull: true},

      manufacturer_id: {type: Sequelize.INTEGER, allowNull: true},

      specification_id: {type: Sequelize.INTEGER, allowNull: true},

      SynthType: {
        type: Sequelize.ENUM(
          'Analog',
          'Digital',
          'Drum machine',
          'Effects processor',
          'Sampler'
        ),
        allowNull: true,
      },

      Format: {
        type: Sequelize.ENUM(
          'Computer software',
          'Desktop / Tabletop',
          'Keyboard',
          'Rack-mount'
        ),
        allowNull: true,
      },

      InterfaceFeature: {
        type: Sequelize.ENUM('Hybrid', 'Modern', 'Vintage'),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Synths');
  },
};
