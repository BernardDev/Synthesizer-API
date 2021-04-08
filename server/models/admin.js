'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
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
    createToken() {
      const payload = {adminId: this.id};
      const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: '4h',
      });
      return token;
    }
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
    static async authenticate(email, password) {
      const admin = await this.findOne({
        where: {email},
      });
      if (!admin) {
        return [
          {
            errors: ['No record found'],
            message: 'This email is not registered',
            status: 404,
          },
          null,
        ];
      }
      const match = await admin.comparePassword(password);

      if (!match) {
        return [
          {
            errors: ['Unauthorized'],
            message: 'You entered the wrong password',
            status: 401,
          },
          null,
        ];
      }

      if (admin.isAdmin === false) {
        return [
          {
            errors: ['Unauthorized'],
            message: 'First wait until approval for admin use by the moderator',
            status: 401,
          },
          null,
        ];
      }
      return [null, admin];
    }
  }
  Admin.init(
    {
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      password: {type: DataTypes.STRING, allowNull: false},
      isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    },
    {
      sequelize,
      modelName: 'Admin',
      hooks: {
        async beforeCreate(instance, options) {
          const hash = await bcrypt.hash(
            instance.dataValues.password,
            saltRounds
          );
          instance.password = hash;
        },
      },
      timestamps: false,
    }
  );
  return Admin;
};
