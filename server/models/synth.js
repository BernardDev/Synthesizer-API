'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Synth extends Model {
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
        unique: true,
      },

      img: {type: DataTypes.STRING, allowNull: true},

      ManufacturerId: {type: DataTypes.INTEGER},

      SpecificationId: {type: DataTypes.INTEGER},

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
