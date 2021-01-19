'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    static associate(models) {
      Manufacturer.hasMany(models.Synth);
    }
  }
  Manufacturer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Manufacturer',
      timestamps: false,
    }
  );
  return Manufacturer;
};
