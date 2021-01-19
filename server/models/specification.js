'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    static associate(models) {
      Specification.hasOne(models.Synth);
    }
  }
  Specification.init(
    {
      polyphony: {type: DataTypes.TEXT, allowNull: true},
      keyboard: {type: DataTypes.TEXT, allowNull: true},
      control: {type: DataTypes.TEXT, allowNull: true},
      yearProduced: {type: DataTypes.INTEGER, allowNull: true},
      memory: {type: DataTypes.TEXT, allowNull: true},
      oscillators: {type: DataTypes.TEXT, allowNull: true},
      filter: {type: DataTypes.TEXT, allowNull: true},
      lfo: {type: DataTypes.TEXT, allowNull: true},
      effects: {type: DataTypes.TEXT, allowNull: true},
    },
    {
      sequelize,
      modelName: 'Specification',
      timestamps: false,
    }
  );
  return Specification;
};
