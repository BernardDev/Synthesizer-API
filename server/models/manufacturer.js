'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Manufacturer.hasMany(models.Synth);
      // Synth.belongsTo(models.Manufacturer);
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
