'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      password: {type: DataTypes.STRING, allowNull: false},
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Admin',
      timestamps: false,
    }
  );
  return Admin;
};
