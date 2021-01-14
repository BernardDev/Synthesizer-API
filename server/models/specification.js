'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
