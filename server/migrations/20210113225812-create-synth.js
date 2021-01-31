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
        // unique: true,
      },

      img: {type: Sequelize.STRING, allowNull: true},

      ManufacturerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Manufacturers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      SpecificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Specifications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      synthType: {
        type: Sequelize.ENUM(
          'Analog',
          'Digital',
          'Drum machine',
          'Effects processor',
          'Sampler'
        ),
        allowNull: true,
      },

      format: {
        type: Sequelize.ENUM(
          'Computer software',
          'Desktop / Tabletop',
          'Keyboard',
          'Rack-mount'
        ),
        allowNull: true,
      },

      interfaceFeature: {
        type: Sequelize.ENUM('Hybrid', 'Modern', 'Vintage'),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Synths');
  },
};
