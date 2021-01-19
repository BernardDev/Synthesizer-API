'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Synth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Synth.belongsTo(models.Manufacturer);
      Synth.belongsTo(models.Specification);
    }
  }
  Synth.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      img: {type: DataTypes.STRING, allowNull: true},

      ManufacturerId: {type: DataTypes.INTEGER, allowNull: true},

      SpecificationId: {type: DataTypes.INTEGER, allowNull: true},

      synthType: {
        type: DataTypes.ENUM(
          'Analog',
          'Digital',
          'Drum machine',
          'Effects processor',
          'Sampler'
        ),
      },

      interfaceFeature: {
        type: DataTypes.ENUM('Hybrid', 'Modern', 'Vintage'),
      },

      format: {
        type: DataTypes.ENUM(
          'Computer software',
          'Desktop / Tabletop',
          'Keyboard',
          'Rack-mount'
        ),
      },
    },

    {
      sequelize,
      modelName: 'Synth',
      timestamps: false,
    }
  );
  return Synth;
};
