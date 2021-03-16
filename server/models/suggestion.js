'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suggestion.init(
    {
      polyphony: {type: DataTypes.STRING, allowNull: true},
      keyboard: {type: DataTypes.STRING, allowNull: true},
      control: {type: DataTypes.STRING, allowNull: true},
      yearProduced: {type: DataTypes.INTEGER, allowNull: false},
      memory: {type: DataTypes.STRING, allowNull: true},
      oscillators: {type: DataTypes.STRING, allowNull: true},
      filter: {type: DataTypes.STRING, allowNull: true},
      lfo: {type: DataTypes.STRING, allowNull: true},
      effects: {type: DataTypes.STRING, allowNull: true},
      name: {type: DataTypes.STRING, allowNull: false, unique: true},
      manufacturer: {type: DataTypes.STRING, allowNull: false},
      image: {type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: 'Suggestion',
      timestamps: false,
    }
  );
  return Suggestion;
};
