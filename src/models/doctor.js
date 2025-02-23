'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    specialty: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    hospitalAffiliation: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};