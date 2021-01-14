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
      // define association here
    }
  }
  Synth.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      img: {type: DataTypes.STRING, allowNull: true},

      manufacturer_id: {type: DataTypes.INTEGER, allowNull: true},

      specification_id: {type: DataTypes.INTEGER, allowNull: true},

      SynthType: {
        type: DataTypes.ENUM(
          'Analog',
          'Digital',
          'Drum machine',
          'Effects processor',
          'Sampler'
        ),
      },

      InterfaceFeature: {
        type: DataTypes.ENUM('Hybrid', 'Modern', 'Vintage'),
      },

      Format: {
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
