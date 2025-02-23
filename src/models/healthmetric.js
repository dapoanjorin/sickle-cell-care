'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthMetric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthMetric.init({
    patientId: DataTypes.INTEGER,
    deviceId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    heartRate: DataTypes.DECIMAL,
    bloodOxygenLevel: DataTypes.DECIMAL,
    temperature: DataTypes.DECIMAL,
    painLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthMetric',
  });
  return HealthMetric;
};