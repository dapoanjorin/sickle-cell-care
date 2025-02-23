'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    scdType: DataTypes.STRING,
    medicalHistory: DataTypes.TEXT,
    emergencyContactId: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};