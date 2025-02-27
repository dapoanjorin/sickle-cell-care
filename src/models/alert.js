'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alert.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    alertTime: DataTypes.DATE,
    alertType: DataTypes.STRING,
    alertSeverity: DataTypes.STRING,
    alertMessage: DataTypes.TEXT,
    acknowledged: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Alert',
  });
  return Alert;
};